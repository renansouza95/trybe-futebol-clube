import { Router } from 'express';
import LoginController from '../controllers';
import { authenticateLogin, authenticateToken } from '../middlewares/auth';

const routes = Router();

const loginController = new LoginController();

routes.post('/', authenticateLogin, loginController.login);
routes.get('/validate', authenticateToken, loginController.validate);

export default routes;
