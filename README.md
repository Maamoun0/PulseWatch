# 🛰️ PulseWatch
### Enterprise-Grade Uptime & Cron Monitoring

**Ahmed Maamoun** • *Lead Engineer*

---

## 🔍 The Mission
Monitoring shouldn't be complicated. **PulseWatch** was born out of a need for a unified platform that tracks both active (HTTP) and passive (Cron) services. It’s built for teams who need to know exactly when and **why** a service fails.

---

## 🖥️ Live Dashboard Preview
<img src="docs/screenshots/dashboard_main.png" alt="PulseWatch Interface" width="100%" />

<br/>

| Service Availability | Root Cause Analysis |
| :--- | :--- |
| <img src="docs/screenshots/monitors_list.png" width="400" /> | <img src="docs/screenshots/ai_analysis.png" width="400" /> |

---

## 🛠 Key Capabilities
*   **Active Probing:** Global HTTP/HTTPS checks with 1-minute resolution.
*   **Heartbeat API:** Passive monitoring for background tasks; if your job doesn't check in, we let you know.
*   **Instant Diagnostics:** Automated breakdown of DNS, SSL, and HTTP errors.
*   **Glassmorphism UI:** A premium dark-mode interface that doesn't just work well, but looks great on a SOC screen.

---

## ⚙️ Technical Deep Dive: The Data Roll-up Strategy
One of the most interesting challenges I faced was database scaling. Tracking thousands of pings per minute quickly bloats a MongoDB collection.

**My solution:** I implemented a **Time-Series Aggregation Pipeline**. 
1.  Raw pings are stored for 24 hours.
2.  A background worker aggregates this data into hourly "buckets" (storing min/max/avg latency).
3.  Daily snapshots are kept indefinitely.
This reduced our storage footprint by **92%** while keeping our historical charts blazing fast.

---

## 🚀 Deployment
```bash
# Clone
git clone https://github.com/Maamoun0/PulseWatch.git

# Launch Infrastructure
docker-compose up -d
```

---

### 🌐 Connectivity
Built by **Ahmed Maamoun**. Let's connect on [LinkedIn](https://linkedin.com/in/your-linkedin-profile).

*Reliability is a feature, not an afterthought.*
