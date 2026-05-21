import { bookRepository } from '../repositories/book-repository';

export class FindBookByIdService {
  async execute(id: string) {

    const book = await bookRepository.findOneBy({ id: Number(id) });
    
    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  }
}