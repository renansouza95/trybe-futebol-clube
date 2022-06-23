import { sign, SignOptions, verify, JwtPayload } from 'jsonwebtoken';
import { readFileSync } from 'fs';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const jwtSecret: string = readFileSync('jwt.evaluation.key', 'utf-8');

export function generateToken(email: string) {
  return sign({ email }, jwtSecret, jwtConfig);
}

export function validateToken(authorization: string): JwtPayload {
  return verify(authorization, jwtSecret) as JwtPayload;
}
