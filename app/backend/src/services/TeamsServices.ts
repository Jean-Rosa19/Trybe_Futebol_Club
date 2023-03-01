import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';

class TeamService {
  model: ModelStatic<TeamsModel> = TeamsModel;

  async gettAllTeams(): Promise<TeamsModel[]> {
    const result = await this.model.findAll();
    return result;
  }

  async getTeamsById(id:number):Promise<TeamsModel | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}

export default TeamService;
