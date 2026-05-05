# Research: Uptime and Cron Monitoring Platform

## Decision: AI Root Cause Detection
- **Decision**: Use OpenAI GPT-4o-mini for initial root cause analysis.
- **Rationale**: High reasoning capabilities for log analysis with low latency and predictable costs. The "mini" model is sufficient for parsing text-based failure logs and providing structured suggestions.
- **Alternatives considered**: 
    - Claude 3 Haiku: Similar performance, but OpenAI has better ecosystem integration for Node.js currently.
    - Local Llama-3: High operational complexity for MVP; deferred to Phase 3.

## Decision: Queue & Scheduling
- **Decision**: BullMQ on Redis.
- **Rationale**: Industry standard for Node.js background processing. Supports delayed jobs (for intervals), retries with backoff, and horizontal scaling of workers.
- **Alternatives considered**: 
    - Naive `setInterval`: Not scalable across multiple nodes; state is lost on restart.
    - Temporal: Extremely powerful but overkill for simple interval-based polling in MVP.

## Decision: Storage & Log Retention
- **Decision**: PostgreSQL with Prisma ORM; Time-based indexing for `MonitorCheck` logs.
- **Rationale**: Relational integrity for user/monitor management. Fast range queries for 30-day uptime calculations.
- **Alternatives considered**: 
    - TimescaleDB: Excellent for logs, but adds setup complexity. Standard Postgres with a cron-based cleanup (PRUNE) is simpler for MVP.

## Decision: Notification Delivery
- **Decision**: Resend.
- **Rationale**: Developer-first API, excellent deliverability, and React-based email templates (React Email).
- **Alternatives considered**: 
    - SendGrid: Robust but can have complex setup for new domains.
    - Twilio: Too expensive for initial MVP alerting.
