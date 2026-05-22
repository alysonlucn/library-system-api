import { AppDataSource } from '../config/database';
import { Loan } from '../entities/Loan';

export const LoanRepository = AppDataSource.getRepository(Loan);
