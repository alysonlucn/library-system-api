import { AppDataSource } from '../config/database';
import { Book } from '../entities/Book';

export const bookRepository = AppDataSource.getRepository(Book);
