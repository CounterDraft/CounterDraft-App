"use strict";
//set The GLOBALS;
require('./bootstrap.js').init();

var express = require('express');
var app = express();

var routesApi = require('./app/routes-api');
var routesWeb = require('./app/routes-web');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var cors = require('./lib/cors');
// var session = require('express-session')
var sessionFactory = require('./lib/session');
var expressLayouts = require('express-ejs-layouts');
var grunt = require("grunt");

//Server settings;
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionFactory());


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/html_app');
app.set('port', config.server.port);
app.use(expressLayouts);

routesWeb.setup(app);
routesApi.setup(app);

var _addWatcher = function() {
    grunt.cli({
        gruntfile: __dirname + "/Grunt_dev.js",
        extra: {
            key: "run"
        }
    });
}

var _launchApp = function() {

    //init database and starts server after the init;
    GLOBAL.models.sequelize.sync().then(function() {
        try {
            app.listen(app.get('port'), function() {
                logger.info('Loaded configuration: \n' + JSON.stringify(getUtil.inspect(config)));
                logger.info('Server started in ' + config.environment + ' mode.');
                logger.info('Listening on port: ' + app.get('port'));
            });
        } catch (err) {
            logger.log('error', 'Failed to start express', { error: err });
        }
    });
}

if (config.environment === 'production') {
    logger.warn('Creating the build, please wait...');
    grunt.cli({
        gruntfile: __dirname + "/Grunt_pro.js",
        extra: {
            key: "run"
        }
    }, function() {
        //callback;
        _launchApp();
    });
} else {
    logger.info('Bypassing build we are in ' + config.environment + ' please wait...');
    _addWatcher();
    _launchApp();
}
