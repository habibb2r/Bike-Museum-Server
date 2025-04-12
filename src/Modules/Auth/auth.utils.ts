import { TJwtPayload } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {

  const secrets = process.env.JWT_SECRET;
  if (!secrets) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign(jwtPayload, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const isVerfied = jwt.verify(token, secret) as JwtPayload;
  return isVerfied;
};
