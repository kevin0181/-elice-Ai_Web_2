const express = require("express");
const app = express();
const {Server} = require("socket.io");
const PORT = 8081;
const SOCKET_PORT = 8082;

const io = new Server(SOCKET_PORT, {
    cors: {
        origin: "*"
    }
});

let adminRooms = [];

const adminNameSpace = io.of("/admin");
const userNameSpace = io.of("/user");

adminNameSpace.on("connection", (socket) => {
    console.log("admin connection!");

    adminRoomChange(socket);

    socket.on("admin submit", (data) => { //그냥 데이터 받는곳.
        console.log("admin req data : " + JSON.stringify(data));
        responseData(socket, "admin res data", data);
    })

    socket.on("admin create room", ({room}) => {
        socket.join(room);
        adminRoomChange(socket);
    });

    socket.on("send chat", (data, roomName) => {
        socket.to(roomName).emit("get chat", data);
    })

    socket.on("insert room", (room) => {
        socket.join(room);
    })

    socket.on("leave room", (room) => {
        socket.leave(room);
        adminRoomChange(socket);
    })

});

let adminRoomChange = (socket) => {
    adminNameSpace.emit("admin get room", getAdminRoom())
}

let getAdminRoom = () => { //
    adminRooms.length = 0; //방 초기화
    let adminSides = adminNameSpace.adapter.sids;
    (adminNameSpace.adapter.rooms).forEach((_, data) => {
        if (adminSides.get(data) === undefined) {
            adminRooms.push({room: data});
        }
    });
    return adminRooms;
}

userNameSpace.on("connection", (socket) => {
    console.log("user connection!");
    socket.on("user submit", (data) => {
        console.log("user req data : " + JSON.stringify(data));
        responseData(socket, "user res data", data);
    });

})

let responseData = (socket, ev, data) => {
    socket.emit(ev, data);
}

app.listen(PORT, () => {
    console.log("server open " + PORT);
})