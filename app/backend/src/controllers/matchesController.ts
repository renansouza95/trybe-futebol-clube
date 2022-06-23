import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getMatches = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      // Se nao existir query retorna todos os jogos
      if (!inProgress) {
        const response = await this.matchesService.getMatches();
        if (!response) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json(response);
      }
      // Se existir query faz a busca por jogos em progresso
      const response = await this.matchesService.searchMatch(inProgress as string);
      if (!response) return res.status(400).json({ message: 'Bad request' });
      return res.status(200).json(response);
    } catch (error) {
      return res.send(error);
    }
  };

  public createMatch = async (req: Request, res: Response) => {
    try {
      const response = await this.matchesService.createMatch(req.body);
      if (!response) return res.status(400).json({ message: 'Bad request' });
      return res.status(201).json(response);
    } catch (error) {
      return res.send(error);
    }
  };

  public patchMyMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.matchesService.patchMyMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.send(error);
    }
  };

  public editMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.matchesService.editMatch(id, req.body);
      return res.status(200).json({ message: 'Updated' });
    } catch (error) {
      res.send(error);
    }
  };
}
