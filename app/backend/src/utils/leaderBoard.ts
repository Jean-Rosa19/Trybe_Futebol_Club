import { IMatches } from '../interface/Imatches';

const rankingPositions = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
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

const countTeamsHome = (name: string, matches: IMatches[]) => {
  switch (name === rankingPositions.name) {
    case false:
      resetTeamsScore();
      break;
    case true:
      break;
    default:

      break;
  }

  rankingPositions.name = name;
  countHomePoints(matches);
  rankingPositions.totalGames += 1;

  return rankingPositions;
};

const countTeamsAway = (name: string, matches: IMatches[]) => {
  switch (name === rankingPositions.name) {
    case false:
      resetTeamsScore();
      break;
    case true:
      break;
    default:

      break;
  }

  rankingPositions.name = name;
  countAwayPoints(matches);
  rankingPositions.totalGames += 1;

  return rankingPositions;
};

export { countTeamsHome, countTeamsAway };
