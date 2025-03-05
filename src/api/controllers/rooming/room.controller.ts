import { Request, Response } from "express";
import { schema as createRoomDto, ICreateRoomDto } from './schemas/createRoom.dto';
import { ApiController } from "../ApiController";
import { Room } from "@/model/Room";

export class RoomController extends ApiController {

  async create(req: Request, res: Response) {
    const result = this.validate<ICreateRoomDto>(req.body, createRoomDto, res);
    if (result.error) {
      return result.response;
    }
    const name = result.value.name;
    const newRoom = await Room.create({ ...result.value });
    return res.json({
      name,
      room: `room${newRoom.id}`
    });
  }

  registerRoutes(): void {
    this.router.post('/create', this.create.bind(this));
  }
  path(): string {
    return '/api/room';
  }
}
