import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';

type Teams = { id: number; teamName: string };

class TeamService {
  model: ModelStatic<TeamsModel> = TeamsModel;

  async getAllTeams(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }

  async getTeamsById(id:number):Promise<Teams | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}

export default TeamService;
