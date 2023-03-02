import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../utils/jwt';

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    authenticateToken(token);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
