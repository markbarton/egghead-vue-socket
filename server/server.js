const dotenv = require("dotenv").config({
    path: "variables.env"
});

const express = require('express');
const app = express();
const pjson = require("./package.json");
const path = require('path');
const port = process.env.PORT || 8500;

const server = require('http').Server(app);
const io = require('./io').initialize(server);
const logger = require('./logger');

// Static file service
app.use(express.static(path.join(__dirname, 'public')));

// Start the express server
server.listen(port);

logger.info(`${pjson.name} Server Started >> `);
logger.info(`running in ${process.env.NODE_ENV}`);
logger.info(`running on port ${port}`);