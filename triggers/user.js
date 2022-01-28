const moment = require('moment');

const users = [];

// add users
const userJoin = (id, username, room) => {
  lowerCaseName = username.trim().toLowerCase();
  lowerCaseRoom = room.trim().toLowerCase();

  const existUser = users.find((e) => { e.username === lowerCaseName && e.room === lowerCaseRoom });

  if (existUser) return { error: 'User is already taken' };

  const user = {
    id,
    username: lowerCaseName,
    room: lowerCaseRoom,
    joinTime: moment().format('dd/mm/yyyy, h:mm a')
  };
  users.push(user);
  return user;
};

// get user by id
const getUserById = (id) => {
  return users.find((e) => e.id === id);
};

// remove user by id
const removeOne = (id) => {
  const index = users.findIndex((e) => e.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

// get all user in room
const getAllUsers = (room) => {
  return users.filter((e) => e.room === room);
};

module.exports = { userJoin, removeOne, getAllUsers, getUserById };
