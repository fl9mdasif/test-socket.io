const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('a user connected' ,socket.id); 
  
  socket.on('user-message', (msg) => { // Listen for 'user-message' event from client

    // send to all clients
      // io.emit('server-message', msg);  // Broadcast the message to all connected clients

    // board cast to all except sender
  socket.broadcast.emit('server-message',msg ); // Broadcast the message to all connected clients except the sender

  // socket.join('general-room'); // Join a room named 'general-room'
    
  //   io.to('general-room').emit('server-message', msg); // Notify room members
  //   // io.except('general-room').emit('server-message', msg); // Notify non-room members

  });

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })

  // boardcast when a user disconnects


});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});