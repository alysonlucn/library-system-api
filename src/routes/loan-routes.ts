import express from 'express';
import { LoanController } from '../controllers/loan-controller';

const router = express.Router();
const loanController = new LoanController();

router.post('/register', (req, res) => loanController.create(req, res));

export default router;