import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

router.post('/', UserController.register);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);

export default router;