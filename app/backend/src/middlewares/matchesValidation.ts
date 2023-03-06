import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamsServices';

async function validateMatcher(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  const teamService = new TeamService();
  const verifyHomeTeam = await teamService.getTeamsById(homeTeamId);
  const verifyAwayTeam = await teamService.getTeamsById(awayTeamId);
  if (!verifyHomeTeam || !verifyAwayTeam) {
    return res.status(404).json(
      { message: 'There is no team with such id!' },
    );
  }
  next();
}

export default validateMatcher;
