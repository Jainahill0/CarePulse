import { Router } from 'express';
import { PatientController } from '../controllers/patientController';

const router = Router();

router.post('/', PatientController.register);
router.get('/', PatientController.getAll);
router.get('/:id', PatientController.getById);

export default router;