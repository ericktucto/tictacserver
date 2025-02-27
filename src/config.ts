import process from 'process';
import Joi from 'joi';

process.loadEnvFile();

const schema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_ISSUER: Joi.string().optional().default('github.com/ericktucto/tictacserver'),
  JWT_AUDIENCE: Joi.string().optional().default('tictac'),
  JWT_EXPIRATION: Joi.string().optional().default('2h'),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  EXPRESS_PORT: Joi.string().optional().default(3030),
  EXPRESS_HOST: Joi.string().optional().default('0.0.0.0')
}).unknown(true);

const result = schema.validate(process.env);
if (result.error) {
  throw result.error;
}

export const {
  JWT_SECRET,
  JWT_ISSUER = 'github.com/ericktucto/tictacserver',
  JWT_AUDIENCE = 'tictac',
  JWT_EXPIRATION = '2h',
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  EXPRESS_PORT = 3030,
  EXPRESS_HOST = '0.0.0.0'
} = result.value;
