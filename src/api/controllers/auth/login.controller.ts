import { Request, Response } from "express";
import { schema as loginDto, ILoginDto } from './schemas/login.dto';
import { encode } from "@/services/jwt";
import { ApiController } from "../ApiController";
import { Room } from "@/model/Room";

export class LoginController extends ApiController {

  async login(req: Request, res: Response) {
    const result = this.validate<ILoginDto>(req.body, loginDto, res);
    if (result.error) {
      return result.response;
    }
    const name = result.value.name;
    const rooms = await Room.findAll();
    return res.json({
      name,
      rooms,
      token: await encode({ name, id: '1' }),
    });
  }

  registerRoutes(): void {
    this.router.post('/login', this.login.bind(this));
  }
  path(): string {
    return '/api/';
  }
}
