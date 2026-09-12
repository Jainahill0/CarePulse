export interface Patient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  createdAt: string;
}

export interface CreatePatientInput {
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  createdAt: string;
}

export interface PatientVital {
  id: string;
  deviceId: string;
  patientId: string;
  patient?: {
    id: string;
    name: string;
    email: string;
  };
  heartRate?: number;
  systolicBp?: number;
  diastolicBp?: number;
  // oxygenSaturation?: number;
  // bodyTemperature?: number;
  recordedAt: string;
  receivedAt: string;
}