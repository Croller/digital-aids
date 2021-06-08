const { Server } = require('socket.io');

let io = null;

const create = (server) => {
  io = new Server(server);
  io.on('connection', onConnection);
  console.log(`Socket listen on port ${process.env.LOCAL_SERVER_PORT}`);
};

const onConnection = (socket) => {
  socket.on('join', (chanel) => {
    console.log(`Socket joining chanel: ${chanel}`);
    socket.join(chanel);
  });

  socket.on('change', ({ id, table, data }) => {
    io.to(id).emit('change', table, data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected...');
  });
};

const emit = ({
  id,
  type,
  table,
  data,
}) => {
  io.to(id).emit('change', { type, table, data });
};

module.exports = {
  create,
  emit,
};
