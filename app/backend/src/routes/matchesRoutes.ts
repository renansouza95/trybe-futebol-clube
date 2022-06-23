import { Router } from 'express';
import { MatchesController } from '../controllers';
import { authenticateToken, authenticateMatches, authenticateTeams } from '../middlewares/auth';

const routes = Router();

const matchesController = new MatchesController();

routes.get('/', matchesController.getMatches);
routes.post(
  '/',
  authenticateToken,
  authenticateMatches,
  authenticateTeams,
  matchesController.createMatch,
);
routes.patch('/:id/finish', matchesController.patchMyMatch);
routes.patch('/:id', matchesController.editMatch);

export default routes;
