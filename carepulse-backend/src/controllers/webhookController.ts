import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PatientVital } from '../entities/PatientVital';
import { Patient } from '../entities/Patient';
import { PatientVitalsPayload } from '../types/patientVitals';
import { getIO } from '../websocket';

export class WebhookController {
  private static vitalRepository = AppDataSource.getRepository(PatientVital);
  private static patientRepository = AppDataSource.getRepository(Patient);

  static async handleDeviceTelemetry(req: Request<{}, {}, PatientVitalsPayload>, res: Response): Promise<Response> {
    try {
      const deviceSignature = req.headers['x-device-api-key'];
      const expectedSecret = process.env.DEVICE_WEBHOOK_SECRET;

      if (!expectedSecret || deviceSignature !== expectedSecret) {
        return res.status(401).json({ error: 'Unauthorized webhook source' });
      }

      const { deviceId, patientId, timestamp, vitals } = req.body;

      if (!deviceId || !patientId || !vitals) {
        return res.status(400).json({ error: 'Missing required device payload properties' });
      }

      const patient = await WebhookController.patientRepository.findOneBy({ id: patientId });
      if (!patient) {
        return res.status(404).json({ error: `Patient with ID ${patientId} not found` });
      }

      const vitalRecord = WebhookController.vitalRepository.create({
        deviceId,
        patientId,
        patient,
        heartRate: vitals.heartRate,
        systolicBp: vitals.bloodPressure?.systolic,
        diastolicBp: vitals.bloodPressure?.diastolic,
        recordedAt: timestamp ? new Date(timestamp) : new Date(),
      });

        const savedVital = await WebhookController.vitalRepository.save(vitalRecord);

        const vitalsPayload = {
            ...savedVital,
            patient: {
                id: patient.id,
                name: patient.name,
                email: patient.email,
            },
        };

      try {
        const io = getIO();
        const roomName = `patient:${patientId.toLowerCase().trim()}`;
        io.to(roomName).emit('new_vitals', vitalsPayload);
        io.emit('global_vital_alert', vitalsPayload);
      } catch (wsError) {
        console.error('WebSocket emission failed:', wsError);
      }

      return res.status(202).json({
        status: 'accepted',
        deviceId,
        patientId
      });
    } catch (error: any) {
      console.error('Webhook ingestion error:', error);
      return res.status(500).json({ error: 'Failed to process device vitals' });
    }
  }

  static async getByPatientId(req: Request<{ patientId: string }>, res: Response): Promise<Response> {
  try {
    const { patientId } = req.params;
    const vitals = await WebhookController.vitalRepository.find({
      where: { patientId },
      relations: { patient: true },
    });
    return res.status(200).json(vitals);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve vitals' });
  }
}
}