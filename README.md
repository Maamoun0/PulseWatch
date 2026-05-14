# PulseWatch

**PulseWatch** is a premium uptime and cron monitoring platform designed for modern engineering teams. It provides real-time visibility into service availability, heartbeat monitoring for scheduled jobs, and automatic root cause analysis.

---

## Features

- **Real-time Uptime Monitoring**: High-frequency HTTP probes with global status tracking.
- - **Heartbeat (Cron) Monitoring**: Passive monitoring for your background jobs and scripts via a simple ping API.
  - - **Root Cause Analysis**: Automatically diagnose downtime incidents and suggest fixes.
    - - **Interactive Timeline**: Visual history of service availability and response times.
      - - **Premium UI/UX**: Sleek, glassmorphism-inspired dark mode dashboard built with Next.js and Tailwind CSS.
        - - **Advanced Alerting**: Stay notified via Email and Webhooks (configurable thresholds to avoid noise).
         
          - ---

          ## Root Cause Analysis

          PulseWatch doesn't just tell you that your site is down; it tells you **why**. By analyzing error codes, response times, and patterns, the built-in diagnostics engine provides immediate insights.

          ---

          ## Tech Stack

          - **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion.
          - - **Backend**: Node.js, Express, Socket.io.
            - - **Database**: MongoDB with Mongoose.
              - - **Monitoring**: Custom HTTP Probing Engine.
               
                - ---
                Created by Ahmed Maamoun
                
