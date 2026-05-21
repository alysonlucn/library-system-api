import { Book } from '../entities/Book';
import { CreateBookService } from '../services/create-book-service';
import { ListBookService } from '../services/list-book-service';
import { FindBookByIdService } from '../services/find-book-id-service';

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

  async list(req: any, res: any) {
    try {
      const listBookService = new ListBookService();
      const books: Book[] = await listBookService.execute();

      res.status(200).json(books);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findById(req: any, res: any) {
    try {
      const { id } = req.params;
      const findBookByIdService = new FindBookByIdService();
      const book: Book = await findBookByIdService.execute(id);

      res.status(200).json(book);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}