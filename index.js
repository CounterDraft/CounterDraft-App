"use strict";

var express = require('express');
var app = express();
var bootstrap = require('./bootstrap.js');

//Add GLOBAL;
bootstrap.init();

var routesApi = require('./app/routes-api');
var routesWeb = require('./app/routes-web');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('./lib/cors');
var sessionFactory = require('./lib/sessionFactory');
var expressLayouts = require('express-ejs-layouts');

routesWeb.setup(app);
routesApi.setup(app);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);
app.use(sessionFactory({}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/html_app');
app.set('port', config.server.port);
app.use(expressLayouts);

app.listen(app.get('port'), function() {
    logger.info('Loaded configuration: \n' + getUtil.inspect(config));
    logger.info('Server started.');
    logger.info('Listening on port: ' + app.get('port'));
});
