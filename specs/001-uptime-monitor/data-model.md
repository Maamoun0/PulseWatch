# Data Model: Uptime and Cron Monitoring Platform

## Entities

### User
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `passwordHash`: String
- `plan`: Enum (FREE, PRO, ENTERPRISE)
- `createdAt`: DateTime

### Monitor
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key -> User)
- `name`: String
- `type`: Enum (URL, CRON)
- `url`: String (Optional, for URL type)
- `interval`: Int (Seconds)
- `timeout`: Int (Seconds)
- `expectedStatus`: Int (Default: 200)
- `bodyRegex`: String (Optional)
- `status`: Enum (UP, DOWN, PAUSED)
- `lastChecked`: DateTime
- `createdAt`: DateTime

### MonitorCheck
- `id`: UUID (Primary Key)
- `monitorId`: UUID (Foreign Key -> Monitor)
- `status`: Enum (UP, DOWN)
- `statusCode`: Int
- `responseTime`: Int (ms)
- `errorMessage`: String (Optional)
- `checkedAt`: DateTime

### Incident
- `id`: UUID (Primary Key)
- `monitorId`: UUID (Foreign Key -> Monitor)
- `startedAt`: DateTime
- `resolvedAt`: DateTime (Optional)
- `rootCause`: String (AI Generated)
- `debugSuggestion`: String (AI Generated)

### AlertConfiguration
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key -> User)
- `type`: Enum (EMAIL, WEBHOOK)
- `target`: String (Email address or URL)
- `enabled`: Boolean

## Relationships
- **User (1) -> Monitor (N)**: A user can manage multiple monitors.
- **Monitor (1) -> MonitorCheck (N)**: Each monitor has a history of checks (retained for 30 days).
- **Monitor (1) -> Incident (N)**: Each monitor can have multiple downtime incidents.
- **User (1) -> AlertConfiguration (N)**: A user can configure multiple notification channels.

## State Transitions
- **Monitor Status**:
    - `UP` -> `DOWN`: Triggered after 3 consecutive failed `MonitorCheck` results.
    - `DOWN` -> `UP`: Triggered after 2 consecutive successful `MonitorCheck` results.
