# Tasks: Uptime and Cron Monitoring Platform

**Input**: Design documents from `/specs/001-uptime-monitor/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Dashboard**: `dashboard/src/`
- **API**: `api/src/`
- **Docker**: `docker/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure for `api` and `dashboard` per implementation plan
- [ ] T002 Initialize NestJS project in `api/` with dependencies (Prisma, BullMQ, Passport, Resend)
- [ ] T003 Initialize Next.js project in `dashboard/` with dependencies (TailwindCSS, Zustand, Lucide)
- [ ] T004 [P] Configure shared `docker/docker-compose.yml` for PostgreSQL and Redis
- [ ] T005 [P] Setup environment variable templates (`.env.example`) in `api/` and `dashboard/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T006 Setup Prisma schema with `User` entity in `api/prisma/schema.prisma`
- [ ] T007 [P] Implement Authentication module with JWT in `api/src/modules/auth/`
- [ ] T008 [P] Setup base API routing and global error handling in `api/src/common/`
- [ ] T009 Initialize BullMQ instance and base queue configuration in `api/src/queue/`
- [ ] T010 [P] Create base layout and navigation in `dashboard/src/components/layout/`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Create and Manage URL Monitors (Priority: P1) 🎯 MVP

**Goal**: Enable users to create, view, and monitor HTTP/HTTPS endpoints.

**Independent Test**: Create a URL monitor, verify it starts polling, and check that the status updates in the dashboard.

### Implementation for User Story 1

- [ ] T011 [P] [US1] Add `Monitor` (URL type) and `MonitorCheck` entities to `api/prisma/schema.prisma`
- [ ] T012 [US1] Implement `MonitorsService` for CRUD operations in `api/src/modules/monitors/monitors.service.ts`
- [ ] T013 [US1] Implement `MonitorsController` for REST endpoints in `api/src/modules/monitors/monitors.controller.ts`
- [ ] T014 [US1] Create `URLWorker` to perform HTTP requests in `api/src/queue/workers/url.worker.ts`
- [ ] T015 [US1] Implement polling scheduler logic in `api/src/queue/scheduler.service.ts`
- [ ] T016 [P] [US1] Build "Create Monitor" form in `dashboard/src/components/monitors/MonitorForm.tsx`
- [ ] T017 [US1] Build "Monitor List" view in `dashboard/src/app/monitors/page.tsx`
- [ ] T018 [US1] Implement real-time status updates via polling in `dashboard/src/hooks/useMonitors.ts`

**Checkpoint**: User Story 1 functional - basic URL monitoring works.

---

## Phase 4: User Story 2 - Create and Manage Cron (Heartbeat) Monitors (Priority: P1)

**Goal**: Enable heartbeat monitoring for background jobs.

**Independent Test**: Generate a heartbeat URL, ping it, and verify the "Last Seen" time updates.

### Implementation for User Story 2

- [ ] T019 [P] [US2] Update `Monitor` entity in `api/prisma/schema.prisma` to support CRON type and tokens
- [ ] T020 [US2] Implement `HeartbeatController` for the public ping endpoint in `api/src/modules/heartbeat/heartbeat.controller.ts`
- [ ] T021 [US2] Implement `HeartbeatService` to update monitor status in `api/src/modules/heartbeat/heartbeat.service.ts`
- [ ] T022 [US2] Create `CronWorker` to check for expired heartbeats in `api/src/queue/workers/cron.worker.ts`
- [ ] T023 [P] [US2] Build Heartbeat URL display component in `dashboard/src/components/monitors/HeartbeatDisplay.tsx`
- [ ] T024 [US2] Add Cron Monitor support to `dashboard/src/components/monitors/MonitorForm.tsx`

**Checkpoint**: User Story 2 functional - Cron monitoring works.

---

## Phase 5: User Story 3 - Alerting and Notifications (Priority: P2)

**Goal**: Notify users via Email when monitors fail or recover.

**Independent Test**: Fail a monitor and verify an email is received at the user's address.

### Implementation for User Story 3

- [ ] T025 [P] [US3] Add `AlertConfiguration` and `Incident` entities to `api/prisma/schema.prisma`
- [ ] T026 [US3] Implement `AlertsService` using Resend/SendGrid in `api/src/modules/alerts/alerts.service.ts`
- [ ] T027 [US3] Implement Incident detection logic (3-fail threshold) in `api/src/modules/monitors/monitors.service.ts`
- [ ] T028 [US3] Implement smart alert suppression (no spam) in `api/src/modules/alerts/suppression.service.ts`
- [ ] T029 [P] [US3] Build "Alert Settings" page in `dashboard/src/app/settings/alerts/page.tsx`
- [ ] T030 [US3] Build "Incident History" view in `dashboard/src/components/monitors/IncidentList.tsx`

**Checkpoint**: User Story 3 functional - Email alerts active.

---

## Phase 6: User Story 4 - Advanced Differentiators: AI Detection (Priority: P3)

**Goal**: Use AI to explain the root cause of downtime.

**Independent Test**: View an incident and verify the "Root Cause" section is populated with AI analysis.

### Implementation for User Story 4

- [ ] T031 [P] [US4] Implement `AIService` to interface with LLM API in `api/src/modules/ai/ai.service.ts`
- [ ] T032 [US4] Integrate `AIService` into Incident creation flow in `api/src/modules/monitors/monitors.service.ts`
- [ ] T033 [US4] Update Incident entity to store AI analysis in `api/prisma/schema.prisma`
- [ ] T034 [P] [US4] Build "Root Cause Analysis" component in `dashboard/src/components/monitors/AIAnalysisCard.tsx`
- [ ] T035 [US4] Build "Cron Visualization Timeline" in `dashboard/src/components/monitors/CronTimeline.tsx`

**Checkpoint**: User Story 4 functional - AI analysis and advanced visualizations active.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, documentation, and performance tuning.

- [ ] T036 Implement 30-day log cleanup job in `api/src/queue/workers/cleanup.worker.ts`
- [ ] T037 [P] Finalize API documentation using Swagger in `api/src/main.ts`
- [ ] T038 Conduct security audit (rate limiting, input validation) across `api/`
- [ ] T039 [P] Final UI polish and responsive testing in `dashboard/`
- [ ] T040 Run `quickstart.md` validation on clean environment

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel
- Models within a story marked [P] can run in parallel
