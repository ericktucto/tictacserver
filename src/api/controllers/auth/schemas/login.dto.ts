import Joi from 'joi';
export interface ILoginDto {
  name: string;
}
export const schema = Joi.object({
  name: Joi.string().required(),
});
