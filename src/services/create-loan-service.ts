import { LoanRepository } from '../repositories/loan-repository';
import { Loan } from '../entities/Loan';
import { bookRepository } from '../repositories/book-repository';
import { UserRepository } from '../repositories/user-repository';
import { Book } from '../entities/Book';
import { User } from '../entities/User';
import { AppError } from '../errors/AppError';
import { z } from 'zod';
import { formatZodIssues } from '../utils/format-zod-error';

interface CreateLoanDTO {
  bookId: number;
  userId: number;
  loanDate?: Date;
}

const createLoanSchema = z.object({
  bookId: z.coerce.number().int().positive('bookId deve ser um inteiro positivo'),
  userId: z.coerce.number().int().positive('userId deve ser um inteiro positivo'),
  loanDate: z
    .preprocess((value) => {
      if (value === '' || value === null || value === undefined) {
        return undefined;
      }
      return value;
    }, z.coerce.date().optional()),
});

export class CreateLoanService {
  async execute({ bookId, userId, loanDate }: CreateLoanDTO): Promise<Loan> {
    const parsedInput = createLoanSchema.safeParse({ bookId, userId, loanDate });
    if (!parsedInput.success) {
      throw new AppError(formatZodIssues(parsedInput.error.issues));
    }

    const validatedData = parsedInput.data;

    const book: Book | null = await bookRepository.findOneBy({ id: validatedData.bookId });
    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }
    if (!book.available) {
      throw new AppError('Livro indisponível para empréstimo');
    }

    const user: User | null = await UserRepository.findOneBy({ id: validatedData.userId });
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const loan: Loan = LoanRepository.create({
      book,
      user,
      loanDate: validatedData.loanDate || new Date(),
    });

    book.available = false;
    await bookRepository.save(book);
    return await LoanRepository.save(loan);
  }
}