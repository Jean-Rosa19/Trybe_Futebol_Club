import { Request, Response } from 'express';

import LoginService from '../services/LoginService';

export default class UserController {
  private _service = new LoginService();

  async login(req: Request, res: Response) {
    try {
      const token = await this._service.login(req.body);
      res.status(200).json({ token });
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }
}

// import LoginService from '../services/LoginService';
// import { createToken } from '../utils/jwt';

// class LoginController {
//   static async checkLogin(req: Request, res: Response) {
//     const { email, password } = req.body;
//     const checkLogin = await LoginService.login(email, password);

//     if (!checkLogin) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     const token = createToken({
//       email: checkLogin,
//     });
//     res.status(200).json({ token });
//   }
// }

// export default LoginController;
