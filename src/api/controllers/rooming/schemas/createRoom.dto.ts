import Joi from 'joi';
export interface ICreateRoomDto {
  name: string;
  winWith: number;
  level: number;
  players: number;
}
export const schema = Joi.object({
  name: Joi.string().required(),
  winWith: Joi.number().greater(2).required(),
  level: Joi.number().greater(2).required(),
  players: Joi.number().required(),
});

