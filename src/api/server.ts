import express from 'express';
import cors from 'cors';
import { EXPRESS_PORT, EXPRESS_HOST } from '@/config';

const app = express();
app.set('port', EXPRESS_PORT);
app.set('host', EXPRESS_HOST);
app.use(cors());

export { app };
