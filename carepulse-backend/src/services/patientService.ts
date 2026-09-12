import { AppDataSource } from '../data-source';
import { Patient } from '../entities/Patient';

interface CreatePatientInput {
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
}

export class PatientService {
  private static patientRepository = AppDataSource.getRepository(Patient);

  static async create(data: CreatePatientInput): Promise<Patient> {
    const existing = await this.patientRepository.findOneBy({ email: data.email });
    if (existing) {
      throw new Error('DUPLICATE_EMAIL');
    }

    const patient = this.patientRepository.create(data);
    return await this.patientRepository.save(patient);
  }

  static async getAll(): Promise<Patient[]> {
    return await this.patientRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  static async getById(id: string): Promise<Patient | null> {
    return await this.patientRepository.findOneBy({ id });
  }
}