import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UsersModel extends Model {
  declare id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UsersModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  userName: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'users',
});