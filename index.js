const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/room')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/entrar.html'));
});


http.listen(PORT, () => {
  console.log(`Servidor ouvindo => ${PORT}`);
});
