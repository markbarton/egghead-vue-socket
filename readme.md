## Egghead Course - Vue and Socket.io for Real-Time Communication

This repo is to support the egghead.io course [Vue and Socket.io for Real-Time Communication](https://egghead.io/courses/vue-and-socket-io-for-real-time-communication)

Each lesson is linked under a different branch.

The Master is a combination of all branches but actually doesnt make sense to run with - you would be better off using the individual lesson branches.

The server folder holds the Express Socket.io server code and the client folder holds the Vue application.

### logger.js & papertrail
If you want to use [Papertrail](http://papertrailapp.com) for logging then you need to update the host and port in logger.js

More information about the logging can be found in my egghead lesson [NodeJS Logging using Winston and Papertrail](https://egghead.io/lessons/javascript-nodejs-logging-using-winston-and-papertrail)

If you don't do this then you will get an error in the console but you can safely ignore it.

### Vue Dependencies
When building the Vue applicatioh the following dependencies are used:

* [Vue-Socket-io](https://github.com/MetinSeylan/Vue-Socket.io)
* [Vuetify](https://vuetifyjs.com/en/)
