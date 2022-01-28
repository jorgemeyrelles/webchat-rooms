const moment = require('moment');

const { userJoin, getUserById, removeOne, getAllUsers } = require("../triggers/user");

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    
    socket.join(user.room);
    // welcome in room chat
    socket.emit('serverMessage', `Bem vindo(a) ${username} a sala sobre ${room}`);
    // welcome message to new user in room
    socket.broadcast.to(user.room).emit('serverMessage', `${user.username} acabou de entrar na sala`);
    // deliver all users within room
    io.to(user.room).emit('userServer', {
      room: user.room,
      users: getAllUsers(user.room),
    });
    // sending messages to a specific room
    socket.on('roomClientMessage', ({ message }) => {
      const user = getUserById(socket.id);

      io
        .to(user.room)
        .emit('serverMessage', `${moment().format('DD/MM/yyy hh:mm:ss A')} - ${user.username}: ${message}`);
    });
    // disconnecting
    socket.on('disconnect', () => {
      const user = removeOne(socket.id);

      socket.broadcast.emit('serverMessage', `${user.username} acabou de sair da sala!`);

      io.to(user.room).emit('userServer', {
        room: user.room,
        users: getAllUsers(user.room),
      });
    });
  });
});
