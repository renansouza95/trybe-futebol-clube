import { NextFunction, Request, Response } from 'express';
import Team from '../../database/models/team';

export function authenticateMatches(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  next();
}

export async function authenticateTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  const isHomeValid = await Team.findByPk(homeTeam);

  const isAwayValid = await Team.findByPk(awayTeam);

  if (!isHomeValid || !isAwayValid) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
}
