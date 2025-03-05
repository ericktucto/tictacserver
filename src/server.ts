import http from 'node:http';
import { Server, Socket } from 'socket.io';
import { app } from '@/api/server';
import WebSocketServices from '@/websocket/services';
import { ApiService } from './services/api';
import { printRoutes } from './utils';
import { conn } from './database/conn';

function onConnection(socket: Socket, io: Server) {
  console.log('connected:', socket.id);
  WebSocketServices.forEach((Service) => {
    new Service({ socket, io, app });
  });
}

async function main() {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  const service = new ApiService({ io, express: app });
  service.register();

  io.on('connection', (socket: Socket) => onConnection(socket, io));

  const port = app.get('port');
  const host = app.get('host');
  conn
    .sync({ alter: true })
    .then(() => {
      console.log("Connected database successfully");
      server.listen(port, host, function() {
        console.log(`Running server on ${host}:${port}`);
        app._router.stack.forEach(printRoutes.bind(null, []));
      });
    }).catch((err) => {
      console.error(err);
    });
}
main();

