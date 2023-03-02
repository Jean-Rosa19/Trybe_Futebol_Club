import * as bcrypt from 'bcryptjs';
// import { authenticateToken } from '../utils/jwt';
import UsersModel from '../database/models/UsersModel';

class LoginService {
  static async login(email: string, password: string) {
    const findUser = await UsersModel.findOne({
      where: { email },
    });
    const checkLogin = await bcrypt.compare(password, findUser?.password || ' ');
    if (!checkLogin) {
      return undefined;
    }
    return findUser;
  }
}

export default LoginService;
