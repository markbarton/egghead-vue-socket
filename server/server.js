const dotenv = require("dotenv").config({
    path: "variables.env"
});
const express = require('express');
const app = express();
const pjson = require("./package.json");
const path = require('path');
const http = require('http').Server(app);
const logger = require('./logger');

require('./io').initialize(http);

const port = process.env.PORT || 8500;
app.use(express.static(path.join(__dirname, 'public')));

http.listen(port);

logger.info(`${pjson.name} Server Started >> `);
logger.info(`running in ${process.env.NODE_ENV}`);
logger.info(`running on port ${port}`);