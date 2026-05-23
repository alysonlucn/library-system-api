import { bookRepository } from '../repositories/book-repository';
import { Book } from '../entities/Book';
import { AppError } from '../errors/AppError';

interface CreateBookDTO {
  title: string;
  author: string;
}

export class CreateBookService {
  async execute({
    title,
    author,
  }: CreateBookDTO): Promise<Book> {
    if (!title || !author) {
      throw new AppError('Todos os campos são obrigatórios');
    }

    if(title.length < 3) {
      throw new AppError('O título deve ter pelo menos 3 caracteres');
    }

    if(author.length < 3) {
      throw new AppError('O autor deve ter pelo menos 3 caracteres');
    }

    const book = bookRepository.create({
      title,
      author,
    });

    await bookRepository.save(book);

    return book;
  }
}

