import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { countHomeTeamPerformance, countTeamsAway, TeamsSorted } from '../utils/leaderBoard';

export default class LeaderBoardService {
  static async getAllsLeaderBoard() {
    const allTeamsArray = await TeamsModel.findAll();

    const teamsHome = await allTeamsArray.map(async (team) => {
      const allMatchesInHome = await MatchesModel.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const finalResultHomeTeam = await countHomeTeamPerformance(team.teamName, allMatchesInHome);

      return { ...finalResultHomeTeam }; // deep clone
    });

    const TeamsResults = await Promise.all(teamsHome);
    // return TeamsResults;
    const sortedTeams = TeamsSorted(TeamsResults);
    return sortedTeams;
  }

  static async getAllLeaderBoardAway() {
    const allTeams = await TeamsModel.findAll();
    const matchStats = await Promise.all(
      allTeams.map(async (element) => {
        const awayMatches = await MatchesModel.findAll({
          where: { awayTeamId: element.id, inProgress: false },
        });
        const finalResultAwayTeam = await countTeamsAway(element.teamName, awayMatches);
        return { ...finalResultAwayTeam };
      }),
    );
    const finalResult = TeamsSorted(matchStats);
    return finalResult;
  }
}
