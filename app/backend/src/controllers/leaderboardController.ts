import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getLeaderboard = async (_req: Request, res: Response) => {
    try {
      const response = await this.leaderboardService.getLeaderboard();
      return res.status(200).json(response);
    } catch (error) {
      res.send(error);
    }
  };
}
