#!/usr/bin/env node
import { Command } from "commander";
import enqueue from "./commands/enqueue.js";
import worker from "./commands/worker.js";
import status from "./commands/status.js";
import list from "./commands/list.js";
import dlq from "./commands/dlq.js";
import config from "./commands/config.js";

const program = new Command();

program
  .name("queuectl")
  .description("A lightweight job queue CLI built with Node.js and LowDB")
  .version("1.0.0");

// Enqueue

program
  .command("enqueue")
  .description("Add a new job to the queue")
  .argument("[job...]", "Job JSON or command string")
  .action(async (jobParts) => {
    const rawInput = jobParts.join(" "); // join all pieces into one string
    await enqueue(rawInput);
  });


// Worker
program
  .command("worker <action>")
  .description("Manage workers (start/stop)")
  .option("--count <number>", "Number of workers to start", "1")
  .action(async (action, options) => await worker(action, options));

// Status
program
  .command("status")
  .description("Show queue status summary")
  .action(async () => await status());

// List
program
  .command("list")
  .description("List all jobs in the queue")
  .option("--state <state>", "Filter jobs by state (pending, completed, etc.)")
  .action(async (options) => await list(options));

// DLQ
program
  .command("dlq")
  .description("Manage Dead Letter Queue")
  .option("--list", "List DLQ jobs")
  .option("--retry <jobId>", "Retry a DLQ job by ID")
  .action(async (options) => await dlq(options));

// Config
program
  .command("config [args...]")
  .description("View or update configuration")
  .action(async (args, cmd) => await config({ args }));

program.parse(process.argv);
