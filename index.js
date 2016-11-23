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
var Umzug = require('umzug');
var Promise = getPromise();
var forceSsl = require('force-ssl-heroku');
var memwatch = require('memwatch-next');


//Server settings;
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(forceSsl);


app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionFactory());
app.use(cors());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/html_app');
app.set('port', config.server.port);
app.use(expressLayouts);

routesWeb.setup(app);
routesApi.setup(app);

//adding memory watcher;
memwatch.on('leak', function(info) {
    logger.warn('warning', info, { info: info });
});

var _addWatcher = function() {
    return new Promise(function(resolve, reject) {
        grunt.cli({
            gruntfile: __dirname + "/Grunt_dev.js",
            extra: {
                key: "run"
            }
        }, function() {
            return resolve(true);
        });
    });
}

var _launchApp = function() {
    //init database and starts server after the init;
    return global.models.sequelize.sync().then(function() {
        if (global.config['migration_run']) {
            var umzug = new Umzug({
                storage: 'sequelize',
                storageOptions: {
                    sequelize: models.sequelize,
                    model: models.sequelize_meta,
                    modelName: 'sequelize_meta',
                    columnType: new models.Sequelize.STRING(100)
                },
                migrations: {
                    params: [models.sequelize.getQueryInterface(), models.Sequelize],
                    path: 'seeders'
                }
            });

            umzug.executed().then(function(migrations) {
                // No need to log this;
                for (var x in migrations) {
                    console.log("Existing migration in system = " + migrations[x].file);
                }

            });
            if (global.config['migration_order'] && global.config['migration_order'] === 'down') {
                return umzug.down();
            } else {
                return umzug.up();
            }
        }
    }).then(function(migrations) {
        if (migrations && migrations.length > 0) {
            if (global.config['migration_order'] && global.config['migration_order'] === 'down') {
                for (var r in migrations) {
                    logger.info("migration applied down() = " + migrations[r].file);
                }
            } else {

                for (var x in migrations) {
                    logger.info("migration applied up() = " + migrations[x].file);
                }
            }

        }
        return app.listen(app.get('port'), function() {
            logger.info('Loaded configuration: \n' + JSON.stringify(getUtil.inspect(config)));
            logger.info('Server started in ' + config.environment + ' mode.');
            logger.info('Listening on port: ' + app.get('port') + '\n');
        });
    });
};

if (global.config.environment === 'production') {
    logger.warn('Creating the build, please wait...');
    new Promise(function(resolve, reject) {
        grunt.cli({
            gruntfile: __dirname + "/Grunt_pro.js",
            extra: {
                key: "run"
            }
        }, function() {
            return resolve(true);
        });

    }).then(function(result) {
        return _launchApp();
    }).catch(function(err) {
        logger.log('Error', 'Failed to start express', { error: err });
    });
} else {
    logger.info('Bypassing build we are in ' + global.config.environment + ' please wait...');
    _launchApp()
        .then(function(result) {
            return _addWatcher();
        }).catch(function(err) {
            logger.log('Error', 'Failed to start express', { error: err });
        });
}
