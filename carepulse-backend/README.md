## CarePulse Backend Service

REST API and WebSocket ingestion engine built with Node.js, Express, TypeORM, and PostgreSQL.

---

## Environment Variables

Create a `.env` file in this directory:

```text
PORT=8082
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=carepulse
DEVICE_WEBHOOK_SECRET=your_device_webhook_secret
```

## Scripts
```text
npm run dev — Start API and WebSocket server with hot reload

npm run build — Compile TypeScript to dist/

npm start — Run compiled production build
```

## API Endpoints
```text
GET /api/v1/patients — List all registered patients

POST /api/v1/patients — Register a new patient

GET /api/v1/patients/:id — Get patient by UUID

GET /api/v1/webhooks/patient/:patientId — Fetch vital telemetry history

POST /api/v1/webhooks/device-vitals — Ingest external device telemetry
```
