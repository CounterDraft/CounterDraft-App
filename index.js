"use strict";

var express = require('express');
var app = express();

var bootstrap = require('./bootstrap.js');
var routes = require('./app/router-main.js');


// bootstrap.start(app, express);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var cors = require('./lib/cors');
var sessionFactory = require('./lib/sessionFactory');
var expressLayouts = require('express-ejs-layouts');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors);
app.use(sessionFactory({}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/html_app');

app.set('port', (process.env.PORT || 8080));

app.use(expressLayouts);

// routes.setup(app);

app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });

// app.listen(GLOBAL.config.server.port, GLOBAL.config.server.ip, function() {
//     logger.info('Server started.');
//     logger.info('Listening on port: ' + GLOBAL.config.server.port);
// });
