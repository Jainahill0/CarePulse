# CarePulse Frontend Client

Reactive medical telemetry dashboard built with Vue 3, Vite, Tailwind CSS, TanStack Table, and Pinia.

---

## Environment Variables

Create a `.env` file in this directory:

```env
VITE_API_BASE_URL=http://localhost:8082/api/v1
VITE_WS_URL=http://localhost:8082
```
## Features
```text
1. Real-time Synchronization: Socket.IO client connects to room-partitioned channels per patient.

2. Telemetry Popups: Global bottom-left notification toasts when new telemetry streams arrive.

3. Paginated Telemetry Table: 10-row paginated data grid powered by @tanstack/vue-table.

4. Clinical Health Cards: Live vital metrics with indicator badges for abnormal readings.
```
# Scripts
```text
npm run dev — Launch Vite dev server

npm run build — Build production bundle to dist/

npm run preview — Locally preview production build
```
