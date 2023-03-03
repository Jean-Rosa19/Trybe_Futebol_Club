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

// const decrypt = (token:string) => {
//   try {
//     const code = jwt.verify(token, secret);
//     return code;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { token, decrypt };

// const secret = process.env.JWT_SECRET || 'minhasenha';

// const generateToken = (payload: JwtPayload): string =>
//   jwt.sign(payload, secret, {
//     expiresIn: '3d',
//     algorithm: 'HS256',
//   });
// const authenticateToken = (token: string) => {
//   const verificationResponse = jwt.verify(token, secret);
//   return verificationResponse;
// };

export { generateToken };
