import db from "../core/storage.js";
import chalk from "chalk";

async function list(options) {
  const state = options.state;
  const jobs = state
    ? db.data.jobs.filter(j => j.state === state)
    : db.data.jobs;

  if (!jobs.length) {
    console.log(chalk.yellow(`No jobs found${state ? ` with state "${state}"` : ""}.`));
    return;
  }

  console.log(chalk.cyan(`\n📋 Listing Jobs${state ? ` (state: ${state})` : ""}`));
  console.table(jobs.map(j => ({
    id: j.id,
    command: j.command,
    state: j.state,
    attempts: j.attempts,
    max_retries: j.max_retries,
    updated_at: j.updated_at
  })));
}

export default list;
