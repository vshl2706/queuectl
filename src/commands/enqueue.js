import db from "../core/storage.js";
import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";

async function enqueue(rawInput) {
  try {
    if (!rawInput || !rawInput.trim()) {
      console.log(chalk.red("❌ No input provided."));
      console.log(chalk.yellow(`Example:`));
      console.log(chalk.gray(`queuectl enqueue '{"command":"echo Hello"}'`));
      return;
    }

    let input = rawInput.trim();

    if (!input.startsWith("{")) {
      input = `{${input}}`;
    }

    if (!input.includes('"')) {
      input = input
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') 
        .replace(/:\s*([^,"}]+)/g, ': "$1"'); 
    }

    let job;
    try {
      job = JSON.parse(input);
    } catch (jsonError) {
      console.log(chalk.red("❌ Invalid JSON format."));
      console.log(chalk.yellow("Example (PowerShell safe):"));
      console.log(chalk.gray(`queuectl enqueue "{\"command\":\"echo Hello\"}"`));
      return;
    }
0
    if (!job.command || typeof job.command !== "string") {
      console.log(chalk.red("❌ Missing or invalid 'command' field in job JSON."));
      console.log(chalk.yellow(`Example: queuectl enqueue '{"command":"echo Hello"}'`));
      return;
    }

    const newJob = {
      id: uuidv4(),
      command: job.command,
      state: "pending",
      attempts: 0,
      max_retries: job.max_retries || 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.data.jobs.push(newJob);
    await db.write();

    console.log(chalk.green(`✅ Job enqueued successfully!`));
    console.log(chalk.cyan(`🆔 ID: ${newJob.id}`));
    console.log(chalk.gray(`💻 Command: ${newJob.command}`));
  } catch (err) {
    console.log(chalk.red("❌ Unexpected error while enqueuing job."));
    console.error(chalk.gray(err.message));
  }
}

export default enqueue;
