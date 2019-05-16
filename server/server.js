const dotenv = require("dotenv").config({
    path: "variables.env"
});
const express = require('express');
const app = express();
const pjson = require("./package.json");
const path = require('path');
const http = require('http').Server(app);
const logger = require('./logger');
const port = process.env.PORT || 8500;
const io = require('./io').initialize(http);
const global_socket = require('./io').io();
const bodyParser = require('body-parser');

// Static file service
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/notification',
    function (req, res) {
        logger.debug(`Message Recieved: ${req.body.message}`);
        global_socket.emit('POPUP_NOTIFICATION', {
            message: req.body.message,
            color: req.body.color
        })
        res.send();
    }
)

// Start the express server
http.listen(port);

logger.info(`${pjson.name} Server Started >> `);
logger.info(`running in ${process.env.NODE_ENV}`);
logger.info(`running on port ${port}`);

setInterval(function () {
    global_socket.emit('PULSE', heartbeat())
}, 1000);

function heartbeat() {
    // Retun a random number between 60 (inc) and max (exc)
    const pulse = Math.ceil(Math.random() * (160 - 60) + 60);
    //logger.debug(`Heartbeat ${pulse}`);
    return pulse;
}