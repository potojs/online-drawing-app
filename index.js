const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require("dotenv").config();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/room/:id/", (req, res)=>{
  const roomId = req.params.id;
  console.log(roomId)
  res.render("main")
})
io.on("connection", socket=>{
  const splitUrl = socket.handshake.headers.referer.split("/");
  const roomId = splitUrl[splitUrl.length-1];
  socket.join(roomId);
  console.log(socket.id, ": ", roomId);

  socket.on("drawing", msg=>{
    msg.id = socket.id;
    socket.to(roomId).emit("drawing", msg);
  })
  socket.on("mouseup", ()=>{
    socket.to(roomId).emit("mouseup", socket.id);
  })
  socket.on("mousedown", ()=>{
    socket.to(roomId).emit("mousedown", socket.id);
  })
})

server.listen(process.env.PORT||3000, ()=> console.log('server started'));