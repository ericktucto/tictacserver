import { Server } from "socket.io";
import { Express } from "express";
import { Router } from "express";
import { Router as IRouter, Response } from "express-serve-static-core";
import { ObjectSchema } from "joi";

interface IValidateResult<T> {
  error: boolean;
  response?: Response;
  value?: T;
}

export abstract class ApiController {
  #io: Server;
  #express: Express;
  #router: IRouter;
  constructor(io: Server, serverExpress: Express) {
    this.#io = io;
    this.#express = serverExpress;
    this.#router = Router();
  }

  get router() {
    return this.#router;
  }

  get express() {
    return this.#express;
  }

  get io() {
    return this.#io;
  }

  validate<T>(
    body: object | undefined,
    schema: ObjectSchema,
    res: Response
  ): IValidateResult<T> {
    const { error, value } = schema.validate(body || {});
    if (error) {
      return {
        error: true,
        response: res.status(400).json({
          message: error.details[0].message,
        })
      };
    }
    return {
      error: false,
      value,
    };
  }

  register() {
    this.registerRoutes();
    this.#express.use(this.path(), this.#router);
  }

  abstract registerRoutes(): void

  abstract path(): string
}
