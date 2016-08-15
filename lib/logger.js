_createLogTable = function(tableName, database_url, winston) {
    var parseDbUrl = require("parse-database-url");
    var dbConfig = parseDbUrl(database_url);
    var pg = require('pg');
    var client = new pg.Client(dbConfig);

    // connect to our database 
    client.connect();
    var query = client.query('CREATE TABLE IF NOT EXISTS ' + tableName + ' (ts timestamp default current_timestamp, level varchar, msg varchar, meta json)');
    query.on('end', function() {
        //add transports;
        GLOBAL.logger.add(winston.transports.PostgreSQL, {
            "name": "server-level",
            "connString": database_url,
            "schema": "public",
            "tableName": tableName
        });

        logger.info('LOGGING ON THE SERVER IS ON');
        GLOBAL.logger.remove('console-level');

        client.end();
    });
}

module.exports = {
    init: function() {
        var winston = require('winston');
        require("winston-postgresql").PostgreSQL;
        winston.emitErrs = true;
        winston.addColors({
            info: 'blue',
            config: 'orange',
            warning: 'yellow',
            debug: 'green',
            error: 'red'
        });

        //create logger & add console transporter;
        var Logger = new(winston.Logger)({
            transports: [
                new(winston.transports.Console)({
                    "name": 'console-level',
                    "timestamp": function() {
                        return GLOBAL.getDateFormatter()(new Date(), 'mm-dd-yyyy HH:MM:ss');
                    },
                    "level": 'info',
                    "silent": false,
                    "colorize": true
                })
            ]
        });

        if (GLOBAL.config.log_level == 'server') {
            var database_url = null;
            if (GLOBAL.config.database_url) {
                database_url = GLOBAL.config.database_url;
            } else {
                database_url = 'postgres://' + GLOBAL.config.database.user +
                    ':' + GLOBAL.config.database.password +
                    '@' + GLOBAL.config.database.host +
                    ':' + GLOBAL.config.database.port +
                    '/' + GLOBAL.config.database.database;
            }
            _createLogTable(GLOBAL.config.log_table, database_url, winston);
        }
        return Logger;
    }
}
