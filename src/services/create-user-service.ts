import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';

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
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const existingUser = await UserRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new Error('Email already in use');
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