import { Request, Response } from 'express';
import TeamService from '../services/TeamsServices';

class TeamsController {
  constructor(private teamService = new TeamService()) {}

  async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const result = await this.teamService.getAllTeams();
    return res.status(200).json(result);
  }

  async getTeamsById(req: Request, res: Response) :Promise<Response> {
    const { id } = req.params;
    const result = await this.teamService.getTeamsById(Number(id));
    return res.status(200).json(result);
  }
}

export default TeamsController;
