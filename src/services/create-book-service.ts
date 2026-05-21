import { bookRepository } from '../repositories/book-repository';
import { Book } from '../entities/Book';

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
      throw new Error("All fields are required");
    }

    if(title.length < 3) {
      throw new Error("Title must be at least 3 characters long");
    }

    if(author.length < 3) {
      throw new Error("Author must be at least 3 characters long");
    }

    const book = bookRepository.create({
      title,
      author,
    });

    await bookRepository.save(book);

    return book;
  }
}

