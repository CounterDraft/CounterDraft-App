"use strict";

var express = require('express');

var app = express();

var startApp = function() {
  var bootstrap = require('./bootstrap.js');
  bootstrap.start(app, express);
  
  var routes = require('./routes.js');
  routes.setup(app);

  app.listen(GLOBAL.config.server.port, GLOBAL.config.server.ip, function() {
    logger.info('Server started.');
    logger.info('Listening on port: ' + GLOBAL.config.server.port);
  });
};

startApp();