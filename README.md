# 🧩 QueueCTL – Job Queue Management CLI

A lightweight and efficient **Job Queue Management System** built in **Go (Golang)**.  
QueueCTL allows you to enqueue background jobs, process them with multiple concurrent workers,  
and manage retries or failures through a **Dead Letter Queue (DLQ)** — all from your terminal.

---

## 🚀 Features

✅ Enqueue and process background jobs  
✅ Concurrent workers (`--count` flag support)  
✅ Retry mechanism for failed jobs  
✅ Dead Letter Queue (DLQ) for persistent failed jobs  
✅ Simple CLI interface with structured commands  
✅ Written in Go – fast, concurrent, and cross-platform

---

## ⚙️ Installation

Clone this repository and build the CLI:

```bash
git clone https://github.com/vshl2706/queuectl.git
cd queuectl
go build -o queuectl
