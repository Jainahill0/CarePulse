import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, phone, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      }

      const user = await UserService.create({ name, email, password, phone, role });
      return res.status(201).json(user);
    } catch (error: any) {
        console.error('User registration error:', error);
      if (error.message === 'DUPLICATE_EMAIL') {
        return res.status(409).json({ error: 'A user with this email already exists.' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (error) {
         console.error( error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getById(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID parameter.' });
      }

      const user = await UserService.getById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}