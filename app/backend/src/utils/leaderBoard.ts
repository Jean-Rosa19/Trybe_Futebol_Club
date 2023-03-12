import { IMatches } from '../interface/Imatches';
import { Ileaderboard } from '../interface/IleaderBoard';

const rankingPositions = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const countVictoryHome = (goalsTeamHome:number, goalsAwayHome:number) => {
  rankingPositions.totalPoints += 3;
  rankingPositions.totalVictories += 1;
  rankingPositions.goalsFavor += goalsTeamHome;
  rankingPositions.goalsOwn += goalsAwayHome;
};

const countVictoryAway = (goalsTeamHome:number, goalsAwayHome:number) => {
  rankingPositions.totalPoints += 3;
  rankingPositions.totalVictories += 1;
  rankingPositions.goalsFavor += goalsAwayHome;
  rankingPositions.goalsOwn += goalsTeamHome;
};

const countDrawHome = (goalsTeamHome:number, goalsAwayHome:number) => {
  rankingPositions.totalPoints += 1;
  rankingPositions.totalDraws += 1;
  rankingPositions.goalsFavor += goalsTeamHome;
  rankingPositions.goalsOwn += goalsAwayHome;
};

const countDrawAway = (goalsTeamHome:number, goalsAwayHome:number) => {
  rankingPositions.totalPoints += 1;
  rankingPositions.totalDraws += 1;
  rankingPositions.goalsFavor += goalsAwayHome;
  rankingPositions.goalsOwn += goalsTeamHome;
};

const countHomeDefeat = (goalsTeamHome:number, goalsAwayHome:number) => {
  rankingPositions.totalPoints += 0;
  rankingPositions.totalLosses += 1;
  rankingPositions.goalsFavor += goalsTeamHome;
  rankingPositions.goalsOwn += goalsAwayHome;
};

const countAwayDefeat = (goalsTeamHome:number, goalsAwayHome:number) => {
  rankingPositions.totalPoints += 0;
  rankingPositions.totalLosses += 1;
  rankingPositions.goalsFavor += goalsAwayHome;
  rankingPositions.goalsOwn += goalsTeamHome;
};

const resetTeamsScore = () => {
  rankingPositions.totalPoints = 0;
  rankingPositions.totalGames = 0;
  rankingPositions.totalVictories = 0;
  rankingPositions.totalDraws = 0;
  rankingPositions.totalLosses = 0;
  rankingPositions.goalsFavor = 0;
  rankingPositions.goalsOwn = 0;
};

const countHomePoints = ((matches: IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    rankingPositions.totalGames += 1;

    switch (true) {
      case homeTeamGoals > awayTeamGoals:
        countVictoryHome(homeTeamGoals, awayTeamGoals);
        break;
      case homeTeamGoals === awayTeamGoals:
        countDrawHome(homeTeamGoals, awayTeamGoals);
        break;
      case homeTeamGoals < awayTeamGoals:
        countHomeDefeat(homeTeamGoals, awayTeamGoals);
        break;
      default:
        break;
    }
  });
});

const countAwayPoints = ((matches: IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    rankingPositions.totalGames += 1;

    switch (true) {
      case homeTeamGoals > awayTeamGoals:
        countVictoryAway(homeTeamGoals, awayTeamGoals);
        break;
      case homeTeamGoals === awayTeamGoals:
        countDrawAway(homeTeamGoals, awayTeamGoals);
        break;
      case homeTeamGoals < awayTeamGoals:
        countAwayDefeat(homeTeamGoals, awayTeamGoals);
        break;
      default:
        break;
    }
  });
});

const countHomeTeamPerformance = (name: string, allTeamMatches: IMatches[]) => {
  if (name !== rankingPositions.name) {
    resetTeamsScore();
  }

  rankingPositions.name = name;
  countHomePoints(allTeamMatches);
  rankingPositions.goalsBalance = rankingPositions.goalsFavor - rankingPositions.goalsOwn;
  rankingPositions.efficiency = Number(
    ((rankingPositions.totalPoints / (rankingPositions.totalGames * 3)) * 100).toFixed(2),
  );
  return rankingPositions;
};

const countTeamsAway = (name: string, allTeamMatches: IMatches[]) => {
  if (name !== rankingPositions.name) {
    resetTeamsScore();
  }

  rankingPositions.name = name;
  countAwayPoints(allTeamMatches);

  return rankingPositions;
};

const TeamsSorted = (matches: Ileaderboard[]) =>
  matches.sort((team1, team2) => {
    switch (true) {
      case team2.totalPoints !== team1.totalPoints:
        return team2.totalPoints - team1.totalPoints;
      case team2.totalVictories !== team1.totalVictories:
        return team2.totalVictories - team1.totalVictories;
      case team2.goalsBalance !== team1.goalsBalance:
        return team2.goalsBalance - team1.goalsBalance;
      case team2.goalsFavor !== team1.goalsFavor:
        return team2.goalsFavor - team1.goalsFavor;
      default:
        return team1.goalsOwn - team2.goalsOwn;
    }
  });

export { countHomeTeamPerformance, countTeamsAway, TeamsSorted };
