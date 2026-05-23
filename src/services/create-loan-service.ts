import { LoanRepository } from '../repositories/loan-repository';
import { Loan } from '../entities/Loan';
import { bookRepository } from '../repositories/book-repository';
import { UserRepository } from '../repositories/user-repository';
import { Book } from '../entities/Book';
import { User } from '../entities/User';
import { AppError } from '../errors/AppError';

interface CreateLoanDTO {
  bookId: number;
  userId: number;
  loanDate?: Date;
}

export class CreateLoanService {
  async execute({ bookId, userId, loanDate }: CreateLoanDTO): Promise<Loan> {
    const book: Book | null = await bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }
    if (!book.available) {
      throw new AppError('Livro indisponível para empréstimo');
    }

    const user: User | null = await UserRepository.findOneBy({ id: userId });
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const loan: Loan = LoanRepository.create({
      book,
      user,
      loanDate: loanDate || new Date(),
    });

    book.available = false;
    await bookRepository.save(book);
    return await LoanRepository.save(loan);
  }
}