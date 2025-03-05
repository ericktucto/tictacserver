import { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } from '@/config';
import { Room } from '@/model/Room';
import { Sequelize } from 'sequelize-typescript';

const conn = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_DATABASE}`, {
  logging: console.log,
  models: [
    Room
  ],
});

export default conn;
export { conn };
