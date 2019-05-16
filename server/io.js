/**
 * Created by markb on 30/06/2017.
 */
const sio = require('socket.io');
const logger = require('./logger');

let io = null;
const users = new Map();
const ids = new Map();

exports.io = function () {
  return io;
};

exports.initialize = function (server) {
  io = sio(server);
  io.on('connection', (socket) => {
    logger.debug(`A user connected with ${socket.id}`);

    socket.on('disconnect', function () {
      const user_data = ids.get(socket.id);
      logger.debug('USER DISCONNECTED ' + user_data.name)
    })

    // Sent from the UserProfile Vue Component
    socket.on('UPDATE_USER', function (data) {
      logger.debug(`UPDATE_USER triggered for ${data.name}`)
      // Map Socket ID with a User
      users.set(data.name, {
        socket_id: socket.id,
        ...data
      });
      ids.set(socket.id, data);

      // Also join a room / group - inbuilt socket functionality
      socket.join(data.group);
    });

    socket.on('SEND_MESSAGE', function (data) {
      // If we have a name then its to a person else group
      let recipient = '';
      if (data.name) {
        const user = users.get(data.name);
        recipient = user.socket_id;
      } else {
        recipient = data.group;
      }
      logger.debug(`POPUP_NOTIFICATION triggered for ${recipient}`)
      io.to(recipient).emit('POPUP_NOTIFICATION', data);
    });

    socket.on('QUIZ_RESPONSE', function (data, fn) {
      const user_data = ids.get(socket.id);
      if (user_data) {
        logger.debug(`${user_data.name} has pressed ${data.response}`);
      }
      if (fn) {
        const yes_no = Math.floor(Math.random() * Math.floor(2));
        const result = (yes_no > 0) ? 'Correct' : 'Incorrect';
        logger.debug(`Calling callback function with ${data.response} was ${result}`);
        fn(`Your answer is ${data.response} which is ${result}`)
      }
    })
  });
};