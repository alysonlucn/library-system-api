import { Loan } from '../entities/Loan';
import { LoanRepository } from '../repositories/loan-repository';

interface ReturnLoanDTO {
  loanId: number;
  returnDate?: Date;
}

export class ListLoanService {
  async execute(): Promise<Loan[]> {
    const loans: Loan[] = await LoanRepository.find({
      relations: { book: true },
    });
    
    return loans;
  }
}