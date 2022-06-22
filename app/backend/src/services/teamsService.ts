import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public getTeams = async (): Promise<ITeam[]> => {
    const response = await Team.findAll();
    return response;
  };

  public getById = async (id: string): Promise<ITeam | null> => {
    const response = await Team.findByPk(Number(id));
    if (!response) return null;
    return response;
  };
}
