import express from 'express';
import { BookController } from '../controllers/book.controller';

const router = express.Router();
const bookController = new BookController();

router.post('/register', (req, res) => bookController.create(req, res));

export default router;