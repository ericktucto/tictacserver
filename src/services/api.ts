import bodyParser from 'body-parser';
import { ApiController } from "@/api/controllers/ApiController";
import { Service } from "./service.base";
import { LoginController } from "@/api/controllers/auth/login.controller";

export class ApiService extends Service {
  register() {
    this.express.use('/api', bodyParser.json());
    this.registerControllers();
  }

  registerControllers() {
    this.controllers.forEach((Controller) => {
      const controller: ApiController = new Controller(this.io, this.express);
      controller.register();
    });
  }

  get controllers() {
    return [
      LoginController
    ];
  }
}
