var DBCreateConnection = function(config) {
    var mysql = require('mysql');
    var connection = mysql.createConnection(config);
    return connection;
};

module.exports = {
	setupGlobals: function() {
		// Setup the configuration
		GLOBAL.config = require('./config/config');

		GLOBAL.BASE_URL = 'http://' + GLOBAL.config.server.ip + ':' + GLOBAL.config.server.port + '/';
		GLOBAL.CONTROLLER_DIR = './app/controller/';
		GLOBAL.MODEL_DIR = './app/model/';
		
		GLOBAL.Promise = require('promise');

		GLOBAL.generateUUID = function() {
			var uuid = require('uuid');
			return uuid.v4();
		};
		
		GLOBAL.getAuthorization = function() {
			return require('express-authorization');
		};
		
		GLOBAL.getExpressSession = function() {
			return require('express-session');
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
		// var cors = require('./lib/cors');
		var sessionFactory = require('./lib/sessionFactory');
		var expressLayouts = require('express-ejs-layouts');

		app.use(express.static(__dirname));
		app.use(bodyParser.urlencoded( { extended: true } ));
		app.use(bodyParser.json());
		app.use(cookieParser());
		// app.use(cors);
		app.use(sessionFactory({}));
		
		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');
		app.set('layout', 'layouts/html_app');

		app.set('port', (process.env.PORT || GLOBAL.config.server.port));
		
		app.use(expressLayouts);
		
		// TODO: Complete this
		if (process.env) {
			// app.env = {}
			//    app.env.MODE = (process.env.MODE || 'undefined');
			//    app.isAuth = true;
			//    app.package_name = process.env.npm_package_name;
			
			//    console.log(app.env.MODE);
		}
	},

	start: function(app, express) {
		this.setupGlobals();
		// logger.info('Loaded configuration: \n' + JSON.stringify(config));
		this.setupApp(app, express);
	}
};