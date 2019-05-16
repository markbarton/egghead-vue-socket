const sio = require('socket.io');
const logger = require('./logger');

let io = null;

exports.io = function () {
  return io;
};

exports.initialize = function (server) {
  io = sio(server);
  io.on('connection', (socket) => {
    logger.debug(`A user connected with ${socket.id}`);
  })
};