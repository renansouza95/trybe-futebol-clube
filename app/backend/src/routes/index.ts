import { Application } from "express";

const Routes = (app: Application) => {
  app.get('/', (_req, res) => res.status(200).json('sucesso'));
}

export default Routes;