import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';
import { AppError } from '../errors/AppError';

interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({
    username,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    if (!username || !email || !password) {
      throw new AppError('Todos os campos são obrigatórios');
    }

    if (password.length < 6) {
      throw new AppError('A senha deve ter pelo menos 6 caracteres');
    }

    const existingUser = await UserRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new AppError('E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = UserRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await UserRepository.save(user);

    return user;
  }
}