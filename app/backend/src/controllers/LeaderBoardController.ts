import { Request, Response } from 'express';

import LeaderBoardService from '../services/LeaderBoardService';

class LeaderBoardController {
  static async getAllsLeaderBoard(req: Request, res: Response) {
    const leaderBoardResponse = await LeaderBoardService.getAllsLeaderBoard();
    res.status(200).json(leaderBoardResponse);
  }

  static async getAllLeaderBoardAway(req: Request, res: Response) {
    const LeaderBoardAwayResponse = await LeaderBoardService.getAllLeaderBoardAway();
    res.status(200).json(LeaderBoardAwayResponse);
  }
}

export default LeaderBoardController;
