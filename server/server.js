const dotenv = require("dotenv").config({
    path: "variables.env"
});
const express = require('express');
const app = express();
const pjson = require("./package.json");
const path = require('path');
const http = require('http').Server(app);
const logger = require('./logger');
const fs = require('fs');

require('./io').initialize(http);
const socket = require('./io').io();

const port = process.env.PORT || 8500;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/send_image', function (req,res){
    logger.debug(`Send Image Called`);
    const image_file_path = __dirname + get_random_image();
    logger.debug(`Sending Image ${image_file_path}`);
    fs.readFile(image_file_path, function (err, buf) {
        socket.emit('SHOW_IMAGE', {
            image: true,
            buffer: buf.toString('base64')
        })
    })
    res.send();
})

http.listen(port);

logger.info(`${pjson.name} Server Started >> `);
logger.info(`running in ${process.env.NODE_ENV}`);
logger.info(`running on port ${port}`);

function get_random_image(){
    const index = Math.ceil(Math.random() * (6-1) + 1);
    return path.normalize(`/images/image${index}.jpg`)
}