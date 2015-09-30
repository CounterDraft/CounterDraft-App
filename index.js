"use strict";

var express = require('express');
var app = express();

var bootstrap = require('./bootstrap.js');
var routes = require('./app/router-main.js');


bootstrap.start(app, express);

routes.setup(app);

app.listen(GLOBAL.config.server.port, function() {
    logger.info('Server started.');
    logger.info('Listening on port: ' + GLOBAL.config.server.port);
});