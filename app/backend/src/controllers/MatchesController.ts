import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _service = new MatchesService();

  async getAllMatches(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    const allMatches = await this._service.getAllMatches(inProgress);

    return res.status(200).json(allMatches);
  }

  async finishMatcher(req: Request, res: Response): Promise<Response | void > {
    const { id } = req.params;
    await this._service.finishMatcher(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatcher(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.updateMatcher(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Score changed successfully' });
  }

  async postAMatcher(req:Request, res: Response): Promise<Response | void> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const result = await this._service.postAMatcher(
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    );
    res.status(201).json(result);
  }
}
