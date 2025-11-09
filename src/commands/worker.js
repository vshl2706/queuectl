import { exec } from "child_process";
import db from "../core/storage.js";
import chalk from "chalk";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runWorker(workerId) {
  while (true) {
    const job = db.data.jobs.find(j => j.state === "pending");

    if (!job) {
      await delay(1000); // Poll every 1s
      continue;
    }

    job.state = "processing";
    job.updated_at = new Date().toISOString();
    await db.write();

    console.log(chalk.blue(`🧩 Worker ${workerId} started job ${job.id}: ${job.command}`));

    exec(job.command, async (error) => {
      if (error) {
        job.attempts += 1;
        const delaySecs = Math.pow(db.data.config.backoffBase || 2, job.attempts);
        console.log(chalk.yellow(`⚠️ Job ${job.id} failed (attempt ${job.attempts}). Retrying in ${delaySecs}s.`));

        if (job.attempts >= job.max_retries) {
          job.state = "dead";
          db.data.dlq.push(job);
          db.data.jobs = db.data.jobs.filter(j => j.id !== job.id);
          console.log(chalk.red(`💀 Job ${job.id} moved to DLQ after ${job.max_retries} retries.`));
        } else {
          job.state = "failed";
          await db.write();
          setTimeout(async () => {
            job.state = "pending";
            await db.write();
          }, delaySecs * 1000);
        }
      } else {
        job.state = "completed";
        console.log(chalk.green(`✅ Job ${job.id} completed successfully.`));
      }

      job.updated_at = new Date().toISOString();
      await db.write();
    });
  }
}

async function worker(action, options) {
  if (action === "start") {
    const count = parseInt(options.count || "1", 10);
    console.log(chalk.cyan(`🚀 Starting ${count} worker(s)...`));
    for (let i = 1; i <= count; i++) runWorker(i);
  } else if (action === "stop") {
    console.log(chalk.yellow("🛑 Graceful stop not implemented in this basic version."));
  } else {
    console.log(chalk.red("❌ Invalid worker command. Use 'start' or 'stop'."));
  }
}

export default worker;
