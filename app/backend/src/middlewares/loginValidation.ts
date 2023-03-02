import { Request, Response, NextFunction } from 'express';

const fieldsValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;

  if (!isValidEmail || isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default fieldsValidate;
