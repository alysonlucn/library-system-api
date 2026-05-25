import { Loan } from '../entities/Loan';
import { AppError } from '../errors/AppError';
import { CreateLoanService } from '../services/create-loan-service';
import { ReturnLoanService } from '../services/returned-loan-service';
import { ListLoanService } from '../services/list-loan-service';

export class LoanController {
  async create(req: any, res: any, next: any) {
    try {
      const { bookId } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError('Usuario nao autenticado', 401);
      }

      const createLoanService = new CreateLoanService();
      const loan: Loan = await createLoanService.execute({
        bookId,
        userId,
      });

      res.status(201).json(loan);
    } catch (error: any) {
      next(error);
    }
  }

  async return(req: any, res: any, next: any) {
    try {
      const { loanId } = req.params;
      const { returnDate } = req.body;

      const returnLoanService = new ReturnLoanService();
      const loan: Loan = await returnLoanService.execute({
        loanId: parseInt(loanId, 10),
        returnDate: returnDate ? new Date(returnDate) : undefined,
      });

      res.status(200).json(loan);
    } catch (error: any) {
      next(error);
    }
  }

  async list(req: any, res: any, next: any) {
    try {
      const listLoanService = new ListLoanService();
      const loans: Loan[] = await listLoanService.execute();

      res.status(200).json(loans);
    } catch (error: any) {
      next(error);
    }
  }
}