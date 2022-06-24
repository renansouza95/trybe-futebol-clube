import IMatch from '../interfaces/IMatch';
import ILeaderboard from '../interfaces/ILeaderboard';

// const teamObj = {
//   name: '',
//   totalPoints: 0,
// totalGames: 0,
// totalVictories: 0,
// totalDraws: 0,
// totalLosses: 0,
// goalsFavor: 0,
// goalsOwn: 0,
// goalsBalance: 0,
// efficiency: 0,
// } as ILeaderboard;

// const winner = (match: IMatch) => {
//   const { homeTeamGoals, awayTeamGoals } = match;
//   if (homeTeamGoals > awayTeamGoals) {
//     teamObj.totalVictories += 1;
//     // awayTeamObj.totalLosses += 1;
//   } else if (homeTeamGoals < awayTeamGoals) {
//     // awayTeamObj.totalVictories += 1;
//     teamObj.totalLosses += 1;
//   } else {
//     teamObj.totalDraws += 1;
//     // awayTeamObj.totalDraws += 1;
//   }
// };

const victories = (matches: IMatch[]) => {
  let totalVictories = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalVictories += 1;
    }
  });
  return totalVictories;
};

const draws = (matches: IMatch[]) => {
  let totalDraws = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      totalDraws += 1;
    }
  });
  return totalDraws;
};

const losses = (matches: IMatch[]) => {
  let totalLosses = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      totalLosses += 1;
    }
  });
  return totalLosses;
};

const points = (matches: IMatch[]) => {
  let totalPoints = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalPoints += 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      totalPoints += 1;
    }
  });
  return totalPoints;
};

const howManyMatches = (matches: IMatch[]) => matches.length;

const goalsFavor = (matches: IMatch[]) => {
  let goals = 0;
  matches.forEach((match) => {
    goals += match.homeTeamGoals;
  });
  return goals;
};

const goalsOwn = (matches: IMatch[]) => {
  let goals = 0;
  matches.forEach((match) => {
    goals += match.awayTeamGoals;
  });
  return goals;
};

const goalsBalance = (matches: IMatch[]) => goalsFavor(matches) - goalsOwn(matches);

const efficiency = (matches: IMatch[]) => {
  const totalPoints = points(matches);
  const totalGames = howManyMatches(matches);
  const rating = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return Number(rating);
};

const generateBoard = (teams: string[], matches: IMatch[]) => {
  const leaderboard = [] as ILeaderboard[];

  teams.forEach((name) => {
    const filter = matches.filter((match) => match.teamHome.teamName === name);
    leaderboard.push({
      name,
      totalPoints: points(filter),
      totalGames: howManyMatches(filter),
      totalVictories: victories(filter),
      totalDraws: draws(filter),
      totalLosses: losses(filter),
      goalsFavor: goalsFavor(filter),
      goalsOwn: goalsOwn(filter),
      goalsBalance: goalsBalance(filter),
      efficiency: efficiency(filter),
    });
  });

  return leaderboard;
};

// https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
const rankTeams = (leaderboard: ILeaderboard[]) => {
  leaderboard.sort((a, b) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.totalVictories === b.totalVictories) {
        if (a.goalsBalance === b.goalsBalance) {
          if (a.goalsFavor === b.goalsFavor) {
            return a.goalsOwn - b.goalsOwn;
          }
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalVictories - a.totalVictories;
    }
    return b.totalPoints - a.totalPoints;
  });
  return leaderboard;
};

export {
  generateBoard,
  rankTeams,
};
