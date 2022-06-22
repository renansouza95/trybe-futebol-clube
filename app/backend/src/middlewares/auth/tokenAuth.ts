import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../jwt/token';

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    validateToken(authorization);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
}
