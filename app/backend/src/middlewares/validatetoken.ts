import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import Iuser from '../interface/Iuser';

const { JWT_SECRET } = process.env;

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const result = jwt.verify(authorization, JWT_SECRET as jwt.Secret);
    const { role } = result as Iuser;
    if (role) next();
  } catch ({ message }) {
    console.error(message);
    res.status(401).json({ message: 'Token must be a valid token' });
    return;
  }
  next();
}
