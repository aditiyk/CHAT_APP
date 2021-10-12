const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
//using the cors middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    //it's going to tell us which url is going to be making our calls to the socket.io server
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  //to join a room we need to first create an event in the backend which determines when to join a room
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3001, () => {
  //callback function for whenever the server runs, it's going to console log a message
  console.log("message");
});
