import { Request, Response } from 'express';

import LeaderBoardService from '../services/LeaderBoardService';

class LeaderBoardController {
  static async getAllsLeaderBoard(req: Request, res: Response) {
    const leaderBoardResponse = await LeaderBoardService.getAllsLeaderBoard();
    res.status(200).json(leaderBoardResponse);
  }
}

export default LeaderBoardController;
