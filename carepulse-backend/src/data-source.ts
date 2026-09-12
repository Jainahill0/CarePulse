import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Patient } from './entities/Patient';
import { User } from './entities/User';
import { PatientVital } from './entities/PatientVital';


dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: String(process.env.DB_PASSWORD ?? ''),
  database: process.env.DB_NAME || 'carepulse',
  synchronize: true,
  logging: false,
  entities: [Patient, User, PatientVital],
});