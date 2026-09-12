import bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { User, UserRole } from '../entities/User';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export class UserService {
  private static userRepository = AppDataSource.getRepository(User);

  static async create(data: CreateUserInput): Promise<Omit<User, 'password'>> {
    const existing = await this.userRepository.findOneBy({ email: data.email });
    if (existing) {
      throw new Error('DUPLICATE_EMAIL');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const { password, ...safeUser } = savedUser;
    return safeUser as Omit<User, 'password'>;
  }

  static async getAll(): Promise<Omit<User, 'password'>[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  static async getById(id: number): Promise<Omit<User, 'password'> | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}