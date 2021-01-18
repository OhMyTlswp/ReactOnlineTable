const express = require('express');
const app = express();

app.use(express.static('public'));
server = app.listen('8000', () => console.log('Server is running...'));

const io = require('socket.io')(server);

io.on('connection', () => {
  console.log('Connection');
});
