import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchesService {
  model: ModelStatic<MatchesModel> = MatchesModel;

  async getAllMatches(inProgress: unknown): Promise<MatchesModel[]> {
    const result = await this.model.findAll(
      { include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      },
    );
    if (inProgress === 'true') {
      return result.filter((element) => element.inProgress === true);
    }
    if (inProgress === 'false') {
      return result.filter((element) => element.inProgress === false);
    }

    return result;
  }
}
