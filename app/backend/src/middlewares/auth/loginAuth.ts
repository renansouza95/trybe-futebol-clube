import { NextFunction, Request, Response } from 'express';

export default function authenticateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const isValid = regex.test(email);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!isValid || password.length <= 6) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
}
