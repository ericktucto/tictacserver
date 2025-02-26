import http from 'node:http';
import { Server, Socket } from 'socket.io';
import { app } from '@/api/server';
import WebSocketServices from '@/websocket/services';
import ApiServices from '@/api/services';

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

  ApiServices.forEach((Service) => {
    new Service({ app, io });
  });

  io.on('connection', (socket: Socket) => onConnection(socket, io));

  const port = app.get('port');
  const host = app.get('host');
  server.listen(port, host, function() {
    console.log(`Running server on ${host}:${port}`);
  });
}
main();
