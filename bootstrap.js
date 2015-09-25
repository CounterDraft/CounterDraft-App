var DBCreateConnection = function(config) {
    var mysql = require('mysql');
    var connection = mysql.createConnection(config);
    return connection;
};

module.exports = {
	setupGlobals: function() {
		// Setup the configuration
		GLOBAL.config = require('./config/config');
		GLOBAL.config.server.port = process.env.PORT || GLOBAL.config.server.port;

		GLOBAL.BASE_URL = 'http://' + GLOBAL.config.server.ip + ':' + GLOBAL.config.server.port + '/';
		GLOBAL.CONTROLLER_DIR = './controller/';
		GLOBAL.MODEL_DIR = './model/';
		
		GLOBAL.Promise = require('promise');

		GLOBAL.generateUUID = function() {
			var uuid = return('uuid');
			return uuid.v4();
		};

		GLOBAL.getController = function(controllerName) {
			var Controller = require(GLOBAL.CONTROLLER_DIR + controllerName);
			return new Controller();
		};

		GLOBAL.getModel = function(modelName) {
			var Model = require(GLOBAL.MODEL_DIR + modelName);
			return new Model();
		};
		
		GLOBAL.getDBConnection = function() {
			var mysql = require('mysql');
			var dbconfig = GLOBAL.config.database;
			var connection = mysql.createConnection(dbconfig);
			return connection;
		};
		
		GLOBAL.generatePasswordHash = function(password, salt) {
			var shasum = GLOBAL.getSHA1();
			shasum.update(salt + password + salt);
			var hash = shasum.digest('hex');
			return hash;
		};

		GLOBAL.getCrypt = function() {
			return require('crypto');
    	};
		
		GLOBAL.getSHA1 = function() {
			var crypt = GLOBAL.getCrypt();
			var shasum = crypt.createHash('sha1');
			return shasum;
		};
		
		GLOBAL.getValidator = function() {
			var validator = require('validator');
			validator.extend('isPassword', function(str) {
				// TODO: Finish writing the regex to test passwords
				if(!str) {
					return false;
				}
				return true;
				//return /^$/.test(str);
			});
			return new Validator();
		};

		GLOBAL.getDateFormatter = function() {
			return require('dateformat');
		};
		
		GLOBAL.smtpTransport = require("nodemailer").createTransport(GLOBAL.config.email);
		GLOBAL.logger = require('./lib/logger');
	},
	
	setupApp: function(app, express) {
		var cookieParser = require('cookie-parser');
		var bodyParser = require('body-parser');
		var cors = require('./lib/cors');

		app.use(express.static(__dirname + '/public'));
		app.use(bodyParser.urlencoded( { extended: true } ));
		app.use(bodyParser.json());
		app.use(cookieParser());
		app.use(cors);
	},

	startBootstrap: function(app, express) {
		this.setupGlobals();
		logger.info('Loaded configuration: \n' + JSON.stringify(config));
		this.setupApp(app, express);
	}
};