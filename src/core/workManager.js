import { exec } from "child_process";
import db from "./storage.js";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function startWorkers(count) {
  console.log(`🚀 Starting ${count} worker(s)...`);
  for (let i = 0; i < count; i++) runWorker(i + 1);
}

async function runWorker(workerId) {
  while (true) {
    const job = db.data.jobs.find(j => j.state === "pending");
    if (!job) {
      await delay(1000); 
      continue;
    }

    job.state = "processing";
    job.updated_at = new Date().toISOString();
    await db.write();

    console.log(`🧩 Worker ${workerId} executing job ${job.id}: ${job.command}`);

    exec(job.command, async (error) => {
      if (error) {
        job.attempts += 1;
        const delaySecs = Math.pow(db.data.config.backoffBase, job.attempts);
        console.log(`❌ Job ${job.id} failed. Retrying in ${delaySecs}s`);

        if (job.attempts > job.max_retries) {
          job.state = "dead";
          db.data.dlq.push(job);
          console.log(`💀 Job ${job.id} moved to DLQ`);
        } else {
          job.state = "failed";
          setTimeout(() => job.state = "pending", delaySecs * 1000);
        }
      } else {
        job.state = "completed";
        console.log(`✅ Job ${job.id} completed`);
      }

      job.updated_at = new Date().toISOString();
      await db.write();
    });
  }
}
