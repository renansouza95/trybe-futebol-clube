import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public getTeams = async (_req: Request, res: Response) => {
    try {
      const response = await this.teamsService.getTeams();
      if (!response) return res.status(500).json({ message: 'Server error' });
      return res.status(200).json(response);
    } catch (error) {
      return res.send(error);
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await this.teamsService.getById(id);
      if (!response) return res.status(404).json({ message: 'Team not found' });
      return res.status(200).json(response);
    } catch (error) {
      return res.send(error);
    }
  };
}
