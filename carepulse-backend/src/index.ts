import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import patientRoutes from './routes/patientRoutes';
import userRoutes from './routes/userRoutes';
import apiRouter from './routes';
import webhookRoutes from './routes/webhookRoutes';
import { initWebSocket } from './websocket';
import http from 'http';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8082;

initWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRouter);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/webhooks', webhookRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully via TypeORM.');
    server.listen(PORT, () => {
      console.log(`Server & WebSockets listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });