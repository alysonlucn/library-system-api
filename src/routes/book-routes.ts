import express from 'express';
import { BookController } from '../controllers/book.controller';

const router = express.Router();
const bookController = new BookController();

router.post('/register', (req, res) => bookController.create(req, res));
router.get('/', (req, res) => bookController.list(req, res));
router.get('/:id', (req, res) => bookController.findById(req, res));

export default router;