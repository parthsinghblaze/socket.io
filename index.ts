import Express, { NextFunction, Request, Response } from 'express';
import { Server } from "socket.io"
const app = Express()


const PORT = 8000

const server = app.listen(PORT, () => {
  console.log("TESTING")
  console.log(`I am running in ${PORT}`)
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

const io = new Server(server);
const sockets: any = []
io.on('connection', function (socket) {
  sockets.push(socket);
  console.log("sockets", sockets.length);
  socket.on('message', function (message) {
    for (let i = 0; i < sockets.length; i++) {
      console.log("message", message);
      console.log("sockets", sockets.length)
      sockets[i].send(message);
    }
  });
  socket.emit('greeting-from-server', {
    greeting: 'Hello Client'
  });
  socket.on('greeting-from-client', function (message) {
    console.log(message);
  });
});

