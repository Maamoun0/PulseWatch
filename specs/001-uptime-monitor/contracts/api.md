# API Contract: Uptime and Cron Monitoring Platform

## Base URL: `/api/v1`

### Authentication
- `POST /auth/register`: Create new account
- `POST /auth/login`: Authenticate and receive JWT

### Monitors
- `GET /monitors`: List all monitors for the user
- `POST /monitors`: Create a new monitor (URL or CRON)
- `GET /monitors/:id`: Get detailed status and 24h uptime stats
- `PATCH /monitors/:id`: Update monitor configuration
- `DELETE /monitors/:id`: Remove monitor

### Logs & Incidents
- `GET /monitors/:id/logs`: Paginated history of checks
- `GET /monitors/:id/incidents`: List of downtime incidents

### Heartbeat (Cron)
- `GET /heartbeat/:token`: Endpoint for cron jobs to ping. 
    - *Success (200)*: Heartbeat recorded.
    - *Failure (404)*: Token invalid.

### Settings & Notifications
- `GET /settings/alerts`: List alert configurations
- `POST /settings/alerts`: Add notification channel
- `DELETE /settings/alerts/:id`: Remove notification channel
