import io from 'socket.io-client';
import { getUrl } from 'client/utils/common';

let socket = null;

export const initSocket = (id) => {
  socket = process.env.NODE_ENV === 'development' ? 'http://localhost:8086' : getUrl();
  socket = io(socket);
  if (socket && id) {
    socket.emit('join', id);
    console.log(`Socket join ${id}`);
  }
};

export const closeSocket = () => {
  console.log('Socket disconnect');
  if (socket) socket.disconnect();
};

export const subscribeChange = (cb) => {
  if (!socket) return null;
  socket.on('change', msg => cb(null, msg));
};

export const setChange = (obj = null, method = 'change') => {
  if (socket) socket.emit(method, obj);
};
