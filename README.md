# PulseWatch 📡

**PulseWatch** is a premium, AI-powered uptime and cron monitoring platform designed for modern engineering teams. It provides real-time visibility into service availability, heartbeat monitoring for scheduled jobs, and automatic root cause analysis using GPT-4o.

![PulseWatch Dashboard](docs/screenshots/dashboard_main.png)

## ✨ Features

- **Real-time Uptime Monitoring**: High-frequency HTTP probes with global status tracking.
- **Heartbeat (Cron) Monitoring**: Passive monitoring for your background jobs and scripts via a simple ping API.
- **AI-Powered Root Cause Analysis**: Integrated with GPT-4o to automatically diagnose downtime incidents and suggest fixes.
- **Interactive Timeline**: Visual history of service availability and response times.
- **Premium UI/UX**: Sleek, glassmorphism-inspired dark mode dashboard built with Next.js and Tailwind CSS.
- **Intelligent Alerting**: Stay notified via Email and Webhooks (configurable thresholds to avoid noise).

## 🚀 AI Root Cause Analysis

PulseWatch doesn't just tell you that your site is down; it tells you **why**. By analyzing error codes, response times, and patterns, the built-in AI engine provides immediate insights.

![AI Analysis](docs/screenshots/ai_analysis.png)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons, Zustand.
- **Backend**: NestJS, BullMQ (Redis), Prisma (PostgreSQL).
- **AI**: OpenAI GPT-4o Mini.
- **Alerts**: Resend API.
- **Infrastructure**: Docker & Docker Compose.

## 📦 Project Structure

```bash
├── api/          # NestJS Backend API
├── dashboard/    # Next.js Frontend Dashboard
├── docker/       # Docker configuration (PostgreSQL, Redis)
├── specs/        # Technical specifications and planning
└── docs/         # Documentation and assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20+)
- Docker & Docker Compose

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Maamoun0/PulseWatch.git
   cd PulseWatch
   ```

2. **Environment Variables:**
   Copy `.env.example` in both `api/` and `dashboard/` and fill in your keys (OpenAI, Resend, Database URL).

3. **Launch Infrastructure:**
   ```bash
   docker-compose -f docker/docker-compose.yml up -d
   ```

4. **Install & Run:**
   ```bash
   # In api/
   npm install && npm run start:dev
   
   # In dashboard/
   npm install && npm run dev
   ```

## 📊 Monitoring View

Track all your services in one place with detailed response time metrics.

![Monitors List](docs/screenshots/monitors_list.png)

---

Developed with ❤️ by [Maamoun](https://github.com/Maamoun0)
