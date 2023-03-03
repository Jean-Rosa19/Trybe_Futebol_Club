import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import Iuser from '../interface/Iuser';

const { JWT_SECRET } = process.env;

export default function generateToken(data: Iuser): string {
  const { id, username, email } = data;

  const token = jwt.sign({ id, username, email }, JWT_SECRET as jwt.Secret, {
    expiresIn: '3d',
    algorithm: 'HS256',
  });

  return token;
}

const decrypt = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET as jwt.Secret);
    return payload;
  } catch (error) {
    return undefined;
  }
};

export { generateToken, decrypt };
