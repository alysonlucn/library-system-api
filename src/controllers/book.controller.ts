import { Book } from '../entities/Book';
import { CreateBookService } from '../services/create-book-service';

export class BookController {
  async create(req: any, res: any) {
    try {
      const { title, author } = req.body;

      const createBookService = new CreateBookService();
      const book: Book = await createBookService.execute({
        title,
        author,
      });

      res.status(201).json(book);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}