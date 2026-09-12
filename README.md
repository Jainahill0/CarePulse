# CarePulse — Clinical Telemetry & Patient Monitoring System

CarePulse is a full-stack clinical telemetry system designed to ingest, monitor, and visualize medical device vitals in real time. It features a secure ingestion pipeline, WebSocket broadcasting, and a reactive dashboard with real-time alerts.

---

## System Architecture

```text
CarePulse/
├── carepulse-backend/      # Express, TypeORM, PostgreSQL, Socket.IO
└── carepulse-frontend/     # Vue 3, Vite, Tailwind CSS, TanStack Table, Pinia
```

## Tech Stack
```text
Backend: Node.js, Express, TypeScript, TypeORM, PostgreSQL, Socket.IO

Frontend: Vue 3 (Composition API), Vite, TypeScript, Tailwind CSS, Pinia, TanStack Table

Communication: REST APIs, Socket.IO (WebSockets), Webhook Ingestion
```
## Quick Start
1. Database Setup
Ensure PostgreSQL is running locally on port 5432 with a database named carepulse:
SQL
```text
CREATE DATABASE carepulse;
```
2. Backend Setup
```text
cd carepulse-backend
npm install
npm run dev
```
The server starts at http://localhost:8082.

3. Frontend Setup
```text
cd carepulse-frontend
npm install
npm run dev
```
The UI dashboard runs at http://localhost:5173.

## Real-Time Ingestion Endpoint
Medical devices push vitals via POST request:

1. URL: http://localhost:8082/api/v1/webhooks/device-vitals

2. Header: x-device-api-key: your_device_webhook_secret

Payload:
```text
JSON
{
  "deviceId": "CAREPULSE-MONITOR-001",
  "patientId": "<PATIENT_UUID>",
  "timestamp": "2026-09-12T14:30:00Z",
  "vitals": {
    "heartRate": 75,
    "bloodPressure": {
      "systolic": 120,
      "diastolic": 80
    },
    "oxygenSaturation": 98.5,
    "bodyTemperature": 36.8
  }
}
```
