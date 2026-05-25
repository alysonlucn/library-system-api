import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError('Token ausente', 401));
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Token malformado', 401));
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return next(new AppError('JWT_SECRET nao configurado', 500));
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);

    if (typeof decodedToken === 'string') {
      return next(new AppError('Token invalido', 401));
    }

    const payload = decodedToken as JwtPayload;
    const userId = Number(payload.sub);

    if (!payload.sub || Number.isNaN(userId)) {
      return next(new AppError('Token invalido', 401));
    }

    req.user = { id: userId };
    return next();
  } catch {
    return next(new AppError('Token invalido', 401));
  }
}
