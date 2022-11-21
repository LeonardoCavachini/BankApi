import * as cors from'cors';
import * as express from 'express';
import { Application, RequestHandler } from 'express'
import debug from 'debug';
import { RegisterRoutes, LoginRoutes, AccountRoutes, TransationRoutes } from './routes';

require('express-async-errors');

class App {
  public app: Application = express();

  public debugLog: debug.IDebugger = debug('app');

  constructor() {
    this.config();
    this.routesConfig();
  }

  private config():void {
    const accessControl: RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT, PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());
  }

  routesConfig() {
    this.app.use(new RegisterRoutes().router);
    this.app.use(new LoginRoutes().router);
    this.app.use(new AccountRoutes().router);
    this.app.use(new TransationRoutes().router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log('iniciado porta:', PORT);
    });
  }
}

export { App };
