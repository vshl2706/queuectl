# ⚙️ QueueCTL — Lightweight Job Queue CLI (Node.js + LowDB)

> 🚀 A simple yet powerful **Command-Line Job Queue Manager** built using **Node.js**, **LowDB**, and **Commander.js**.  
> Enqueue jobs, process them with multiple workers, track their status, and manage failed jobs through a **Dead Letter Queue (DLQ)** — all from your terminal.

---

## 🖼️ Preview

<!-- Add your screenshots here -->
## 📸 Screenshots

### 🧩 Enqueue Job
![Enqueue Job](./Screenshots/EnqueueJob.png)

### ⚙️ Worker Start
![Worker Start](./Screenshots/Worker Start.png)

### 💀 Dead Letter Queue
![Dead Letter Queue](./Screenshots/Worker Start and dlq.png)

### ♻️ Retry Job
![config](./Screenshots/Config.png)

---

## 📜 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation)
- [Usage](#️-usage)
- [Example Workflow](#-example-workflow)
- [Command Reference](#-command-reference)
- [Project Structure](#-project-structure)
- [Future Enhancements](#-future-enhancements)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 💡 About the Project

**QueueCTL** is a developer-focused CLI that mimics real-world background job systems like **BullMQ** or **Celery**, but in a lightweight, local-friendly form.

It supports:
- Adding jobs to a queue
- Processing jobs with concurrent workers
- Handling retries for failed jobs
- Managing a **Dead Letter Queue (DLQ)** for unprocessed tasks
- Displaying queue status and job history

---

## ✨ Key Features

✅ Enqueue jobs via CLI using simple JSON commands  
✅ Parallel job execution using multiple workers (`--count`)  
✅ Automatic retry system with exponential backoff  
✅ Persistent data storage with **LowDB**  
✅ Dead Letter Queue (DLQ) for failed jobs  
✅ Built-in commands for monitoring queue health  
✅ Colored terminal outputs for better UX (via Chalk)

---

## 🧰 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Node.js (ESM)** | Core runtime environment |
| **Commander.js** | CLI command framework |
| **LowDB** | Lightweight JSON-based database |
| **UUID** | Unique job identification |
| **Chalk** | Terminal colors for better readability |

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone git clone https://github.com/<your-username>/queuectl.git
cd queuectl
```
### 2️⃣ Install Dependencies
npm install

###3️⃣ Link CLI Globally - It is optional
npm link

Now you can use the command anywhere
queuectl --help

## 🧑‍💻 Usage
Enqueue a New Job
```bash
queuectl enqueue "{\"command\":\"echo Hello\"}"
```

Start Workers
```bash
queuectl worker start --count 2
```

View Queue Status
```bash
queuectl status
```

List jobs by state
```bash
queuectl list --state completed
```

Manage Dead Letter Queue (DLQ)
```bash
# List failed jobs
queuectl dlq --list

# Retry a failed job
queuectl dlq --retry <jobId>
```

### 🔁 Example Workflow
```bash
# 1. Add jobs
queuectl enqueue "{\"command\":\"echo Hello\"}"
queuectl enqueue "{\"command\":\"sleep 2\"}"

# 2. Start 2 parallel workers
queuectl worker start --count 2

# 3. Check overall status
queuectl status

# 4. Retry jobs from DLQ if any
queuectl dlq --list
queuectl dlq --retry <jobId>
```

### 🗂️ Project Structure
```bash
queuectl/
├── src/
│   ├── cli.js                # Main CLI entry point
│   ├── core/
│   │   └── storage.js        # LowDB configuration
│   ├── commands/
│   │   ├── enqueue.js
│   │   ├── worker.js
│   │   ├── list.js
│   │   ├── status.js
│   │   ├── dlq.js
│   │   └── config.js
│
├── db.json                   # Queue data store
├── package.json
└── README.md
```


### 👨‍💻 Author
**Visshal Singh**
📧 [vshl2706@gmail.com](mailto:vshl2706@gmail.com)  
🌐 [GitHub Profile](https://github.com/vshl2706)
