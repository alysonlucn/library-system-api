import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Erro interno do servidor' });
}