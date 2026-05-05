# Quickstart: Uptime and Cron Monitoring Platform

## Local Development Setup

### 1. Prerequisites
- Docker & Docker Compose
- Node.js 20+
- PNPM (recommended)

### 2. Environment Configuration
Copy `.env.example` to `.env` in both `api/` and `dashboard/` directories and fill in:
- `DATABASE_URL` (PostgreSQL)
- `REDIS_URL`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`

### 3. Launch Infrastructure
```bash
docker-compose up -d postgres redis
```

### 4. Initialize Database
```bash
cd api
pnpm install
npx prisma migrate dev
```

### 5. Start Services
```bash
# In api/ directory
pnpm dev

# In dashboard/ directory
pnpm dev
```

## Monitoring Logic
- **URL Polling**: The `api` service runs a scheduler that pushes jobs to BullMQ.
- **Heartbeat**: The `api` service exposes a public `/heartbeat/:token` endpoint. 
- **AI Analysis**: When a monitor transitions to `DOWN`, the `ai` module is triggered to analyze the last failed `MonitorCheck`.
