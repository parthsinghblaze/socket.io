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

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message.send', function (data) {
        console.log(data)
        socket.emit('message.sent', data)
    })

    socket.emit('user.connected', socket.id)

    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.emit('user.disconnected', socket.id)
    });
});

