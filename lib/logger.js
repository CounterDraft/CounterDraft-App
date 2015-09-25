var winston = require('winston');
require('winston-mysql-transport').Mysql;

winston.emitErrs = true;

winston.addColors({
	info: 'blue',
	config: 'orange',
	warning: 'yellow',
	debug: 'green',
	error: 'red'
});

var config = GLOBAL.config.database;

var options = {
	host: config.host,
	port: config.port,
	database: config.database,
	table: config.table,
	user: config.user,
	password: config.password,
	level: config.level
};

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			'timestamp': function() {
				return GLOBAL.getDateFormatter()(new Date(), 'mm-dd-yyyy HH:MM:ss');
			},
			level: 'info',
			silent: false,
			colorize: true
		}),
		new (winston.transports.File)({ filename: './log/log.log' })/*,
		new (winston.transports.Mysql)(options)*/
		// TODO: Uncomment when database has been created
	]
});

module.exports = logger;