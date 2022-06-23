import Match from '../database/models/match';
import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';

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
}
