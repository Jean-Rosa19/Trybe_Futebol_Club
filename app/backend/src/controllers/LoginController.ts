import { Request, Response } from 'express';
import { decrypt } from '../utils/jwt';
import LoginService from '../services/LoginService';
import Iuser from '../interface/Iuser';

export default class UserController {
  _service = new LoginService();

  async login(req: Request, res: Response) {
    try {
      const token = await this._service.login(req.body);
      res.status(200).json({ token });
    } catch ({ message }) {
      res.status(401).json({ message });
    }
  }

  async loginRole(req: Request, res: Response) {
    const result = req.headers.authorization;

    const payload = decrypt(result as string) as Iuser;
    const { id, username, email } = payload;
    if (id && username && email) {
      const role = await this._service.loginRole(id, username, email);

      return res.status(200).json({ role });
    }
  }
}
