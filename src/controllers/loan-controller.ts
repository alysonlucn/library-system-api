import { Loan } from '../entities/Loan';
import { CreateLoanService } from '../services/create-loan-service';

export class LoanController {
  async create(req: any, res: any) {
    try {
      const { bookId, userId } = req.body;

      const createLoanService = new CreateLoanService();
      const loan: Loan = await createLoanService.execute({
        bookId,
        userId,
      });

      res.status(201).json(loan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}