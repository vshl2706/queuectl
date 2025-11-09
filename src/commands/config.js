import db from "../core/storage.js";
import chalk from "chalk";

async function config(cmd) {
  const args = cmd.args || [];

  if (args[0] === "set" && args[1] && args[2]) {
    const key = args[1];
    const value = args[2];
    db.data.config[key] = isNaN(value) ? value : Number(value);
    await db.write();
    console.log(chalk.green(`⚙️ Config updated: ${key} = ${value}`));
  } else {
    console.log(chalk.cyan("\n📘 Current Configuration"));
    console.table(db.data.config);
  }
}

export default config;
