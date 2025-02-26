import { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } from '@/config';
import mongoose from 'mongoose';

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_DATABASE}`;

export const db = mongoose.connect(uri).then((res) => {
  if (res) console.log("Connected to db");
}).catch((err) => {
  console.error(err);
});
