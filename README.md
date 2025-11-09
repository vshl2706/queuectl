# ⚙️ QueueCTL — Lightweight Job Queue CLI (Node.js + LowDB)

> 🚀 A simple yet powerful **Command-Line Job Queue Manager** built using **Node.js**, **LowDB**, and **Commander.js**.  
> Enqueue jobs, process them with multiple workers, track their status, and manage failed jobs through a **Dead Letter Queue (DLQ)** — all from your terminal.

---

## 🖼️ Preview

<!-- Add your screenshots here -->
<p align="center">
  <img src="./assets/screenshot1.png" alt="QueueCTL CLI Example" width="600"/>
</p>

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

### 2️⃣ Install Dependencies
npm install

###3️⃣ Link CLI Globally - It is optional
npm link

Now you can use the command anywhere
queuectl --help

