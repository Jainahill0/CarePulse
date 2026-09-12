import { Request, Response } from 'express';
import { PatientService } from '../services/patientService';

export class PatientController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, birthDate } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required fields.' });
      }

      const patient = await PatientService.create({ name, email, phone, birthDate });
      return res.status(201).json(patient);
    } catch (error: any) {
      if (error.message === 'DUPLICATE_EMAIL') {
        return res.status(409).json({ error: 'A patient with this email already exists.' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const patients = await PatientService.getAll();
      return res.status(200).json(patients);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getById(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const patient = await PatientService.getById(id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      return res.status(200).json(patient);
    } catch (error: any) {
      console.error('Error fetching patient by ID:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
}