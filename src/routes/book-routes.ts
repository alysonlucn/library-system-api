import express from 'express';
import { BookController } from '../controllers/book.controller';

const router = express.Router();
const bookController = new BookController();

router.post('/register', (req, res, next) => bookController.create(req, res, next));
router.get('/', (req, res, next) => bookController.list(req, res, next));
router.get('/:id', (req, res, next) => bookController.findById(req, res, next));

export default router;