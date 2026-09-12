import { Router } from 'express';
import patientRoutes from './patientRoutes';
import userRoutes from './userRoutes';
import webhookRoutes from './webhookRoutes';

const router = Router();

router.use('/patients', patientRoutes);
router.use('/users', userRoutes);
router.use('/webhooks', webhookRoutes);

export default router;