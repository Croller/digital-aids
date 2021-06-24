import io from 'socket.io-client';
import { getUrl } from 'client/utils/common';

let socket = null;

export const initSocket = (id) => {
  // socket = io(getUrl());
  socket = io('http://localhost:8086');
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
