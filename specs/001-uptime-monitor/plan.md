# Implementation Plan: Uptime and Cron Monitoring Platform

**Branch**: `001-uptime-monitor` | **Date**: 2026-05-05 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-uptime-monitor/spec.md`

## Summary

PulseWatch / CronGuard / UptimeForge is a comprehensive monitoring platform for URLs, APIs, and Cron jobs. It features a distributed monitoring engine using NestJS and BullMQ to handle high-frequency checks (up to 30s intervals) with high reliability. The system incorporates AI-driven root cause analysis to provide developers with actionable insights during downtime and implements smart alert suppression to prevent notification fatigue.

**Language/Version**: TypeScript / Node.js 20+  
**Primary Dependencies**: Next.js, NestJS, BullMQ (Redis), TailwindCSS, Resend/SendGrid, OpenAI/Claude API (AI)  
**Storage**: PostgreSQL (Prisma), Redis  
**Testing**: Jest (Unit/Integration), Playwright (E2E)  
**Target Platform**: Linux (Dockerized)
**Project Type**: Web Application (Monorepo)  
**Performance Goals**: Alert latency < 10s, Check interval down to 30s  
**Constraints**: 30-day log retention, Email-only MVP alerts  
**Scale/Scope**: ~1000 concurrent users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
api/               # NestJS Backend
├── src/
│   ├── modules/
│   │   ├── monitors/
│   │   ├── heartbeat/
│   │   ├── alerts/
│   │   └── ai/
│   ├── queue/     # BullMQ Workers
│   └── common/
└── tests/

dashboard/         # Next.js Frontend
├── src/
│   ├── app/       # App Router
│   ├── components/
│   ├── hooks/
│   └── lib/
└── tests/

docker/            # Deployment configs
└── docker-compose.yml
```

**Structure Decision**: Web application monorepo structure with separated `api/` and `dashboard/` services to allow independent scaling of workers and frontend.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
