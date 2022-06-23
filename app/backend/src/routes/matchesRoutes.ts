import { Router } from 'express';
import { MatchesController } from '../controllers';

const routes = Router();

const matchesController = new MatchesController();

routes.get('/', matchesController.getMatches);

export default routes;
