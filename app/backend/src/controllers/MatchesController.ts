import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _service = new MatchesService();

  async getAllMatches(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    const allMatches = await this._service.getAllMatches(inProgress);
    return res.status(200).json(allMatches);
  }
}
