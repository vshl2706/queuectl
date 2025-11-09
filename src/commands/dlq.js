// src/commands/dlq.js
import db from "../core/storage.js";
import chalk from "chalk";

async function dlq(options) {
  if (options.list) {
    if (!db.data.dlq.length) {
      console.log(chalk.yellow("No jobs in Dead Letter Queue."));
      return;
    }
    console.log(chalk.cyan("\n🧾 Dead Letter Queue Jobs:"));
    console.table(db.data.dlq.map(j => ({
      id: j.id,
      command: j.command,
      attempts: j.attempts,
      updated_at: j.updated_at
    })));
  } else if (options.retry) {
    const jobId = options.retry;
    const job = db.data.dlq.find(j => j.id === jobId);
    if (!job) {
      console.log(chalk.red(`Job ${jobId} not found in DLQ.`));
      return;
    }
    job.state = "pending";
    db.data.jobs.push(job);
    db.data.dlq = db.data.dlq.filter(j => j.id !== jobId);
    await db.write();
    console.log(chalk.green(`♻️  Job ${jobId} moved back to queue.`));
  } else {
    console.log(chalk.yellow("Use one of the options: --list or --retry <jobId>"));
  }
}

export default dlq;
