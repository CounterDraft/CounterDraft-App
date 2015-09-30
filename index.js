"use strict";

var express = require('express');
var app = express();

var bootstrap = require('./bootstrap.js');
var routesApi = require('./app/routes-api');
var routesWeb = require('./app/routes-web');
var routesApi = require('./app/routes-api');
var routesWeb = require('./app/routes-web');



bootstrap.start(app, express);

routesWeb.setup(app);
routesApi.setup(app);

app.listen(app.get('port'), function() {
    logger.info('Server started.');
    logger.info('Listening on port: ' + app.get('port'));
});
