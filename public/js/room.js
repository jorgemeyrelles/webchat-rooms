const socket = window.io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// console.log(username, room);

socket.emit('joinRoom', { username, room });

const createMessage = (message) => {
  const messageUl = document.querySelector('#mensagens');
  const li = document.createElement('li');
  li.innerText = message;
  messageUl.appendChild(li);
  window.scrollTo(0, document.querySelector('#div-message').scrollHeight);
};

const allOnline = (name) => {
  const all = document.querySelector('#users');
  // console.log(name);
  all.innerHTML = `
    ${name.map((e) => `<li>${e.username}</li>`).join('')}
  `
};

const roomName = (room) => {
  const getRoom = document.querySelector('#room-name');
  getRoom.innerHTML = `<h2>${room}</h2>`;
};

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = inputMessage.value;
  socket.emit('roomClientMessage', { room, message });
  inputMessage.value = '';
  return false;
});

window.onbeforeunload = (event) => {
  socket.disconnect();
};

socket.on('serverMessage', (message) => {
  createMessage(message);
});
socket.on('userServer', ({ room, users }) => {
  // console.log(users);
  allOnline(users);
  roomName(room);
});
