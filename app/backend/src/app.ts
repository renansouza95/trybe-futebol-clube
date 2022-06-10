import * as express from 'express';
import Routes from './routes';

class App {
  public app: express.Express;
  public routes = Routes;

  constructor() {
    this.app = express();
    this.config();
    this.routes(this.app);
    // chamar as rotas aqui; posso criar outro metodo com as rotas e chamar aqui
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
