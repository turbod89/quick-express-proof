const IOServer = require('socket.io');
const parameters = require('../config/parameters');

const io = new IOServer(parameters.socket_port);

const nsUpdates = io.of('/updates');

nsUpdates
    .on('connect', function (socket) {
        console.log('Connected');

        socket.on('disconnect', function (socket) {
            console.log('Disconnected');
        });
    });

return io;

module.exports = io;