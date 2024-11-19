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

io.on('connection', function (socket) {
  socket.emit('greeting-from-server', {
    greeting: 'Hello Client'
  });
  socket.on('greeting-from-client', function (message) {
    console.log(message);
  });
});

