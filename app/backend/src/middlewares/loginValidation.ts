import { Request, Response, NextFunction } from 'express';

const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

function fieldsValidate(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!validateEmail(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return next();
}

export default fieldsValidate;
