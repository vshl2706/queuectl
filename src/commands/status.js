import db from "../core/storage.js";
import chalk from "chalk";

async function status() {
  const counts = {
    pending: db.data.jobs.filter(j => j.state === "pending").length,
    processing: db.data.jobs.filter(j => j.state === "processing").length,
    completed: db.data.jobs.filter(j => j.state === "completed").length,
    failed: db.data.jobs.filter(j => j.state === "failed").length,
    dead: db.data.dlq.length,
  };

  console.log(chalk.cyan("\n📊 Queue Status Summary"));
  console.table(counts);
}

export default status;
