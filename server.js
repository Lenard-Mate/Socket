const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let counter = 0;
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected:'+socket);
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('counter', (msg) => {
        counter = counter + 1;
      console.log('counter ' + counter);
      io.emit('value_of_counter', counter);
    });
  });  
 

