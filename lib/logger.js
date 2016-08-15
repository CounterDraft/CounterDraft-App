module.exports = {
    init: function() {
        var winston = require('winston');
        require("winston-postgresql").PostgreSQL;

        var Logger = null;
        if (GLOBAL.config.log_level == 'local') {
            winston.emitErrs = true;
            winston.addColors({
                info: 'blue',
                config: 'orange',
                warning: 'yellow',
                debug: 'green',
                error: 'red'
            });
            Logger = new(winston.Logger)({
                transports: [
                    new(winston.transports.Console)({
                        'timestamp': function() {
                            return GLOBAL.getDateFormatter()(new Date(), 'mm-dd-yyyy HH:MM:ss');
                        },
                        level: 'info',
                        silent: false,
                        colorize: true
                    })
                ]
            });
        } else if (GLOBAL.config.log_level == 'server') {
            Logger = new(winston.Logger)({
                transports: [
                    new(winston.transports.PostgreSQL)({
                        "connString": "counter:@localhost:5432/counter",
                        "schema": "public",
                        "tableName": "server_log"

                    })
                ]
            });
        } else {
            winston.emitErrs = true;
            winston.addColors({
                info: 'blue',
                config: 'orange',
                warning: 'yellow',
                debug: 'green',
                error: 'red'
            });
            Logger = new(winston.Logger)({
                transports: [
                    new(winston.transports.Console)({
                        'timestamp': function() {
                            return GLOBAL.getDateFormatter()(new Date(), 'mm-dd-yyyy HH:MM:ss');
                        },
                        level: 'info',
                        silent: false,
                        colorize: true
                    })
                ]
            });
        }
        return Logger;
    }
}
