import { Router, Response, Request } from 'express';
import MatchesController from '../controllers/MatchesController';
import verifyToken from '../middlewares/validatetoken';

const MatchesRouter = Router();
const matchesController = new MatchesController();

MatchesRouter.get('/', (req:Request, res:Response) => matchesController.getAllMatches(req, res));
MatchesRouter.patch('/:id/finish', verifyToken, (req:Request, res: Response) => {
  matchesController.finishMatcher(req, res);
});

export default MatchesRouter;
