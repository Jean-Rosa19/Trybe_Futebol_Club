import { Router, Response, Request } from 'express';
import MatchesController from '../controllers/MatchesController';

const MatchesRouter = Router();
const matchesController = new MatchesController();

MatchesRouter.get('/', (req:Request, res:Response) => matchesController.getAllMatches(req, res));

export default MatchesRouter;
