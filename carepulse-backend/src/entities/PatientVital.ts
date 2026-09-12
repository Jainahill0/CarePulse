import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './Patient';

@Entity('patient_vitals')
export class PatientVital {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, name: 'device_id' })
  deviceId!: string;

  @Column({ type: 'uuid', name: 'patient_id' })
  patientId!: string;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;

  @Column({ type: 'int', nullable: true, name: 'heart_rate' })
  heartRate?: number;

  @Column({ type: 'int', nullable: true, name: 'systolic_bp' })
  systolicBp?: number;

  @Column({ type: 'int', nullable: true, name: 'diastolic_bp' })
  diastolicBp?: number;

  @Column({ type: 'float', nullable: true, name: 'spo2' })
  oxygenSaturation?: number;

  @Column({ type: 'float', nullable: true, name: 'temperature' })
  bodyTemperature?: number;

  @Column({ type: 'timestamp with time zone', name: 'recorded_at' })
  recordedAt!: Date;

  @CreateDateColumn({ name: 'received_at' })
  receivedAt!: Date;
}