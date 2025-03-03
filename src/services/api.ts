import { Express, NextFunction, Request, Response } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import { ApiController } from "@/api/controllers/ApiController";
import { Service } from "./service.base";
import { LoginController } from "@/api/controllers/auth/login.controller";
import { decode } from './jwt';
import { Player } from '@/model/Player';

export interface IAuth {
  name: string;
  iat: Date;
  exp: Date;
  iss: string;
  aud: string;
}

export class ApiService extends Service {
  register() {
    (this.express as Express).use(
      '/api',
      bodyParser.json(),
      this.middlewareAuth.bind(this)
    );
    this.registerControllers();
  }

  get auth(): IAuth | undefined {
    return this.express.get('auth');
  }

  set auth(auth: IAuth) {
    this.express.set('auth', auth);
  }

  async middlewareAuth(req: Request, res: Response, next: NextFunction) {
    if (req.url.startsWith('/login')) {
      next();
      return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token: string = authHeader.split(' ')[1];

    const result = await decode(token);
    if (result.error) {
      res.status(403).json({
        error: result.error
      });
      return;
    }
    this.auth = new Player(result.payload);
    next();
  }

  registerControllers() {
    this.controllers.forEach((Controller) => {
      const controller: ApiController = new Controller(this.io, this.express);
      controller.register();
    });
  }

  get controllers() {
    return [
      LoginController,
    ];
  }
}
