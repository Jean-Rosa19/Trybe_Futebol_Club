import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'minhasenha';

const generateToken = (payload: JwtPayload): string =>
  jwt.sign(payload, secret, {
    expiresIn: '3d',
    algorithm: 'HS256',
  });
const authenticateToken = (token: string) => {
  const verificationResponse = jwt.verify(token, secret);
  return verificationResponse;
};

export { generateToken, authenticateToken };
