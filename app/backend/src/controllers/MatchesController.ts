import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _service = new MatchesService();

  async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const result = await this._service.getAllMatches();
    return res.status(200).json(result);
  }
}
