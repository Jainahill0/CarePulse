export interface PatientVitalsPayload {
  deviceId: string;
  patientId: string;
  timestamp: string;
  vitals: {
    heartRate?: number;
    bloodPressure?: {
      systolic: number;
      diastolic: number;
    };
  };
  batteryLevel?: number;
}