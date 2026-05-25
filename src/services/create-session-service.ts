import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repositories/user-repository';
import { formatZodIssues } from '../utils/format-zod-error';

interface CreateSessionDTO {
  email: string;
  password: string;
}

const createSessionSchema = z.object({
  email: z.string().trim().min(1, 'E-mail e obrigatorio').email('E-mail invalido'),
  password: z.string().min(1, 'Senha e obrigatoria'),
});

export class CreateSessionService {
  async execute({ email, password }: CreateSessionDTO): Promise<string> {
    const parsedInput = createSessionSchema.safeParse({ email, password });
    if (!parsedInput.success) {
      throw new AppError(formatZodIssues(parsedInput.error.issues));
    }

    const validatedData = parsedInput.data;

    const user = await UserRepository.findOne({ where: { email: validatedData.email } });

    if (!user) {
      throw new AppError('Credenciais invalidas', 401);
    }

    const doesPasswordMatch = await bcrypt.compare(validatedData.password, user.password);
    if (!doesPasswordMatch) {
      throw new AppError('Credenciais invalidas', 401);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new AppError('JWT_SECRET nao configurado', 500);
    }

    const jwtExpiresIn = (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'];

    const token = jwt.sign({}, jwtSecret, {
      subject: String(user.id),
      expiresIn: jwtExpiresIn,
    });

    return token;
  }
}