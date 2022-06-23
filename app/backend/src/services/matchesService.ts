import Match from '../database/models/match';
import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';

type InsertMatch = {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
};

type CreateMatch = {
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

type EditMatch = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export default class MatchesService {
  public getMatches = async (): Promise<IMatch[]> => {
    const response = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
    });
    return response;
  };

  public searchMatch = async (query: string): Promise<IMatch[] | null> => {
    let isTrue;
    if (query === 'false') isTrue = false;
    if (query === 'true') isTrue = true;
    const response = await Match.findAll({
      where: { inProgress: isTrue },
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
    });
    if (!response) return null;
    return response;
  };

  public createMatch = async (match: InsertMatch): Promise<CreateMatch | null> => {
    const create = await Match.create({
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    if (!create) return null;
    return create;
  };

  public patchMyMatch = async (id: string): Promise<void> => {
    await Match.update(
      { inProgress: false },
      { where: { id: Number(id) } },
    );
  };

  public editMatch = async (id: string, match: EditMatch): Promise<void> => {
    await Match.update(
      { homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
      },
      { where: { id: Number(id) } },
    );
  };
}
