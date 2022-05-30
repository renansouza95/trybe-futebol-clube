import * as express from 'express';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    // ...
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
