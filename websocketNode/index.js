const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
//
// io.on('connection', (socket) => {
//
//     console.log("UserConnected", socket.id);
//     console.log(io.engine.clientsCount);
//
//     socket.on("submit1", (data) => {
//         console.log("submit1 : " + JSON.stringify(data));
//         socket.emit("sendData1", data);
//     });
//
//     socket.on("submit2", (data) => {
//         console.log("submit2 : " + JSON.stringify(data));
//         socket.emit("sendData2", data);
//     })
//
// });
//

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, () => {
    console.log('listening on *:8080');
});