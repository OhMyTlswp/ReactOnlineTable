const express = require('express');
const fs = require('fs');
const app = express();
const colors = require('./colors');
const path = require('path');
// app.use(express.static('public'));
server = app.listen('8000', () => console.log('Server is running...'));
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
let id = 0;
let users = [];
function getTable() {
  if (fs.existsSync(path.resolve('server', 'table.json'))) {
    let rawdata = fs.readFileSync(path.resolve('server', 'table.json'));
    let table = JSON.parse(rawdata).table;
    return table;
  } else {
    let table = [];
    for (let indexY = 0; indexY <= 10; indexY += 1) {
      table.push([]);
      for (let indexX = 0; indexX <= 6; indexX += 1) {
        table[indexY].push({ x: indexX, y: indexY, value: '', isSelected: false });
      }
    }
    let stream = fs.createWriteStream(path.resolve('server', 'table.json'));
    stream.once('open', () => {
      stream.write(JSON.stringify({ table }));
      stream.end();
    });
    return table;
  }
}

function setInTable(table, cell) {
  table[cell.y][cell.x] = cell;
  let stream = fs.createWriteStream(path.resolve('server', 'table.json'));
  stream.once('open', () => {
    stream.write(JSON.stringify({ table }));
    stream.end();
  });
}

io.on('connection', (socket) => {
  socket.id = id;
  socket.user = { id: id, color: colors[id] };
  socket.emit('authorization', socket.user);
  socket.emit('get_table', getTable());
  id += 1;
  console.log('Connection');
  socket.on('save_cell', (cell) => {
    setInTable(getTable(), cell);
    io.sockets.emit('set_cell', cell);
  });
  socket.on('set_user_cursor_on_server', (user) => {
    users.map((usersItem) => (user.id === usersItem.id ? user : usersItem));
    io.sockets.emit('set_user_cursor_on_client', user);
  });
  socket.on('set_users_on_server', (user) => {
    users.push(user);
    io.sockets.emit('set_users_on_client', users);
  });
});
