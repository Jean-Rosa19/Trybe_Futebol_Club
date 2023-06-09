import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchesService {
  model: ModelStatic<MatchesModel> = MatchesModel;

  async getAllMatches(inProgress: unknown) {
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

  async finishMatcher(id: number) {
    await this.model.update({ inProgress: false }, {
      where: { id },
    });
  }

  async updateMatcher(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<number[] | undefined> {
    const result = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return result;
  }

  async postAMatcher(
    homeTeamId:number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals:number,
  ): Promise<MatchesModel> {
    const result = this.model.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true,
    });
    return result;
  }
}
