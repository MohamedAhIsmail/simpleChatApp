import express from "express";

import { Server, Socket } from "socket.io";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

const myServer = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = new Server(myServer, {
  cors: "*",
});

io.on("connection", (socket) => {
  console.log(socket.id);

  // console.log("socket works");

  socket.on("msgInput", (msg) => {
    // console.log("Message form Client: "+ msg)

    // socket.broadcast.emit('replay', msg)

    io.emit('replay', msg)

    // socket.emit("replay", msg);
  });


  socket.on("typing", () => {
    socket.broadcast.emit("userTyping");
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("userStopTyping");
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
