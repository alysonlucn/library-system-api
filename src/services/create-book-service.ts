import { bookRepository } from '../repositories/book-repository';
import { Book } from '../entities/Book';
import { AppError } from '../errors/AppError';
import { z } from 'zod';
import { formatZodIssues } from '../utils/format-zod-error';

interface CreateBookDTO {
  title: string;
  author: string;
}

const createBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'O título é obrigatório')
    .min(3, 'O título deve ter pelo menos 3 caracteres'),
  author: z.string().trim().min(3, 'O autor deve ter pelo menos 3 caracteres'),
});

export class CreateBookService {
  async execute({
    title,
    author,
  }: CreateBookDTO): Promise<Book> {
    const parsedInput = createBookSchema.safeParse({ title, author });
    if (!parsedInput.success) {
      throw new AppError(formatZodIssues(parsedInput.error.issues));
    }

    const validatedData = parsedInput.data;

    const book = bookRepository.create({
      title: validatedData.title,
      author: validatedData.author,
    });

    await bookRepository.save(book);

    return book;
  }
}

