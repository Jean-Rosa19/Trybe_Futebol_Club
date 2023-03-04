import { Model, INTEGER, BOOLEAN } from 'sequelize';
import TeamsModel from './TeamsModel';
import db from '.';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgess: boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'matches',
});
MatchesModel.belongsTo(TeamsModel, { as: 'homeTeam', foreignKey: 'homeTeamId' });
MatchesModel.belongsTo(TeamsModel, { as: 'awayTeam', foreignKey: 'awayTeamId' });

export default MatchesModel;
