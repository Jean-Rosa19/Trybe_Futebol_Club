import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { generateToken } from '../utils/jwt';

class LoginController {
  static async checkLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const checkLogin = await LoginService.login(email, password);
    console.log(checkLogin);
    if (!checkLogin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken({
      email: checkLogin.email,
    });
    res.status(200).json({ token });
  }
}

export default LoginController;
