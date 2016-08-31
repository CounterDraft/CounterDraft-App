"use strict";
//set The GLOBALS;
require('./bootstrap.js').init();

var express = require('express');
var cors = require('cors')
var app = express();
var routesApi = require('./app/routes-api');
var routesWeb = require('./app/routes-web');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
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
app.use(cors());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/html_app');
app.set('port', config.server.port);
app.use(expressLayouts);

app.use(function(req, res, next) {
    //defaults variables;
    res.locals.login = false;
    res.locals.environment = global.config['environment'];
    res.locals.npm_package_name = global.config['npm_package_name'];
    if (typeof req.session.user != 'undefined') {
        res.locals.login = true;
    }
    next();
});

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
    global.models.sequelize.sync().then(function() {
        try {
            app.listen(app.get('port'), function() {
                logger.info('Loaded configuration: \n' + JSON.stringify(getUtil.inspect(config)));
                logger.info('Server started in ' + config.environment + ' mode.');
                logger.info('Listening on port: ' + app.get('port'));
            });
        } catch (err) {
            logger.log('Error', 'Failed to start express', { error: err });
        }
    });
}

if (global.config.environment === 'production') {
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
    logger.info('Bypassing build we are in ' + global.config.environment + ' please wait...');
    _addWatcher();
    _launchApp();
}
