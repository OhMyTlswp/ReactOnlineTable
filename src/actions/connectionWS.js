import io from 'socket.io-client';
import store from '../store';

const socket = io('ws://localhost:8000');

socket.on('connect', () => {
  socket.on('authorization', (data) => {
    console.log(data);
    store.dispatch({ type: 'SET_USER', payload: data });
    socket.emit('set_users_on_server', data);
  });
  socket.on('set_users_on_client', (payload) => {
    store.dispatch({ type: 'SET_USERS', payload });
  });
  socket.on('set_cell', (payload) => {
    store.dispatch({ type: 'SET_CELL', payload });
  });
  socket.on('set_user_cursor_on_client', (payload) => {
    store.dispatch({ type: 'SET_USER_CURSOR', payload });
  });
});

export default socket;
