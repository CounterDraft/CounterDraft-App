"use strict";

var express = require('express');
var app = express();

var bootstrap = require('./bootstrap.js');
var routes = require('./app/router-main.js');


bootstrap.start(app, express);

routes.setup(app);

app.set('port', (process.env.PORT || GLOBAL.config.server.port));

app.listen(app.get('port'), function() {
    logger.info('Server started.');
    logger.info('Listening on port: ' + app.get('port'));
});

// app.listen(GLOBAL.config.server.port, GLOBAL.config.server.ip, function() {
//     logger.info('Server started.');
//     logger.info('Listening on port: ' + GLOBAL.config.server.port);
// });
