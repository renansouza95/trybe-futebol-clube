import Match from '../database/models/match';
import Team from '../database/models/team';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import { generateBoard, rankTeams } from '../helpers/leaderboardHelp';

export default class LeaderboardService {
  public getMatches = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
    });
    return matches;
  };

  public getLeaderboard = async (): Promise<ILeaderboard[]> => {
    const matches = await this.getMatches();
    const teams = matches.map(({ teamHome }) => teamHome.teamName);
    // https://flexiple.com/find-duplicates-javascript-array/#section1
    const filterTeams = teams.filter((team, index) => teams.indexOf(team) === index);
    console.log(filterTeams);
    const board = generateBoard(filterTeams, matches);
    const leaderboard = rankTeams(board);
    return leaderboard;
  };
}
