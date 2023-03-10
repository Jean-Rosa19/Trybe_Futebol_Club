import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req: Request, res: Response) =>
  LeaderBoardController.getAllsLeaderBoard(req, res));

export default leaderBoardRouter;
