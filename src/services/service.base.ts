import { Express } from "express-serve-static-core";
export abstract class Service {
  #io = null;
  #socket = null;
  #express = null;
  constructor({ io = null, socket = null, express = null }) {
    this.#io = io;
    this.#socket = socket;
    this.#express = express;
  }

  get io() {
    return this.#io;
  }

  get socket(): Express | null {
    return this.#socket;
  }

  get express() {
    return this.#express;
  }

  abstract register(): void
}
