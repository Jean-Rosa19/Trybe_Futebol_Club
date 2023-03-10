import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { countTeamsHome } from '../utils/leaderBoard';
// import IMatches from '../interface/Imatches';

export default class LeaderBoardService {
  static async getAllsLeaderBoard() {
    const teamsModel = await TeamsModel.findAll();

    const teamsHome = await teamsModel.map(async (team) => {
      const returnMatchesHome = await MatchesModel.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const HomeBalance = await returnMatchesHome.map((element) => (
        countTeamsHome(team.teamName, [element])));

      const finalResultTeams = HomeBalance[returnMatchesHome.length - 1];
      return { ...finalResultTeams };
    });

    const TeamsResults = await Promise.all(teamsHome);
    return TeamsResults;
  }
}
