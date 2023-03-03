import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import Iuser from '../interface/Iuser';

const { JWT_SECRET } = process.env;

export default function generateToken(data: Iuser): string {
  const { id, user, email } = data;

  const token = jwt.sign({ id, user, email }, JWT_SECRET as jwt.Secret, {
    expiresIn: '3d',
    algorithm: 'HS256',
  });

  return token;
}

export { generateToken };
