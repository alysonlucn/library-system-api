import { Loan } from '../entities/Loan';
import { LoanRepository } from '../repositories/loan-repository';

interface ReturnLoanDTO {
  loanId: number;
  returnDate?: Date;
}

export class ReturnLoanService {
  async execute({ loanId, returnDate }: ReturnLoanDTO): Promise<Loan> {
    const loan: Loan | null = await LoanRepository.findOne({
      where: { id: loanId },
      relations: { book: true },
    });
    
    if (!loan) {
      throw new Error('Loan not found');
    }

    loan.returnDate = returnDate || new Date();
    loan.isReturned = true;
    await LoanRepository.save(loan);

    const book = loan.book;
    book.available = true;
    await LoanRepository.manager.save(book);

    return loan;
  }
}