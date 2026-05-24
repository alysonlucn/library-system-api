import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';
import { AppError } from '../errors/AppError';
import { formatZodIssues } from '../utils/format-zod-error';

interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

const createUserSchema = z.object({
  username: z.string().trim().min(1, 'Nome de usuário é obrigatório'),
  email: z.string().trim().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export class CreateUserService {
  async execute({
    username,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const parsedInput = createUserSchema.safeParse({ username, email, password });
    if (!parsedInput.success) {
      throw new AppError(formatZodIssues(parsedInput.error.issues));
    }

    const validatedData = parsedInput.data;

    const existingUser = await UserRepository.findOne({ where: { email: validatedData.email } });

    if (existingUser) {
      throw new AppError('E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = UserRepository.create({
      username: validatedData.username,
      email: validatedData.email,
      password: hashedPassword,
    });

    await UserRepository.save(user);

    return user;
  }
}