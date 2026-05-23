import { bookRepository } from '../repositories/book-repository';
import { AppError } from '../errors/AppError';

export class FindBookByIdService {
  async execute(id: string) {

    const book = await bookRepository.findOneBy({ id: Number(id) });
    
    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }

    return book;
  }
}