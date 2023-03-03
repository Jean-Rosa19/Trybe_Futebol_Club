import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UsersModel';
import ILogin from '../interface/Ilogin';
import { generateToken } from '../utils/jwt';

export default class UserService {
  private _model: ModelStatic<UserModel> = UserModel;

  async login(data: ILogin) {
    const { email, password } = data;

    const result = await this._model.findOne({
      where: { email },
    });

    if (!result) throw new Error('Invalid email or password');

    if (!(await bcrypt.compare(password, result.dataValues.password))) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(result.dataValues);
    return token;
  }

  async loginRole(id:number, username: string, email: string) {
    const result = await this._model.findOne({
      where: { id, username, email },
    });
    return result?.role;
  }
}
