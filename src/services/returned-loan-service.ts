import { Loan } from '../entities/Loan';
import { LoanRepository } from '../repositories/loan-repository';
import { AppError } from '../errors/AppError';
import { z } from 'zod';
import { formatZodIssues } from '../utils/format-zod-error';

interface ReturnLoanDTO {
  loanId: number;
  returnDate?: Date;
}

const returnLoanSchema = z.object({
  loanId: z.coerce.number().int().positive('loanId deve ser um inteiro positivo'),
  returnDate: z
    .preprocess((value) => {
      if (value === '' || value === null || value === undefined) {
        return undefined;
      }
      return value;
    }, z.coerce.date().optional()),
});

export class ReturnLoanService {
  async execute({ loanId, returnDate }: ReturnLoanDTO): Promise<Loan> {
    const parsedInput = returnLoanSchema.safeParse({ loanId, returnDate });
    if (!parsedInput.success) {
      throw new AppError(formatZodIssues(parsedInput.error.issues));
    }

    const validatedData = parsedInput.data;

    const loan: Loan | null = await LoanRepository.findOne({
      where: { id: validatedData.loanId },
      relations: { book: true },
    });
    
    if (!loan) {
      throw new AppError('Empréstimo não encontrado', 404);
    }

    loan.returnDate = validatedData.returnDate || new Date();
    loan.isReturned = true;
    await LoanRepository.save(loan);

    const book = loan.book;
    book.available = true;
    await LoanRepository.manager.save(book);

    return loan;
  }
}