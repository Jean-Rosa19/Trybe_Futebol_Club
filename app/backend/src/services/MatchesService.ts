import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchesService {
  model: ModelStatic<MatchesModel> = MatchesModel;

  async getAllMatches(): Promise<MatchesModel[]> {
    const result = await this.model.findAll(
      { include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      },
    );

    return result;
  }
}
