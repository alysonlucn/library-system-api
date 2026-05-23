import express from 'express';
import { LoanController } from '../controllers/loan-controller';

const router = express.Router();
const loanController = new LoanController();

router.post('/register', (req, res, next) => loanController.create(req, res, next));
router.post('/return/:loanId', (req, res, next) => loanController.return(req, res, next));
router.get('/list', (req, res, next) => loanController.list(req, res, next));

export default router;