import { bookRepository } from '../repositories/book-repository';

export class ListBookService {
  async execute() {
    const books = await bookRepository.find();
    return books;
  }
}