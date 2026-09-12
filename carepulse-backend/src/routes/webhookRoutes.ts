import { Router } from 'express';
import { WebhookController } from '../controllers/webhookController';

const router = Router();

router.post('/device-vitals', WebhookController.handleDeviceTelemetry);
router.get('/patient/:patientId', WebhookController.getByPatientId);

export default router;