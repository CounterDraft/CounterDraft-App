module.exports = {
    init: function() {
        global.dirBase = process.env.PWD;
        global.mix = require('mix-into');

        // Setup the configuration
        try {
            var local_config = require('./config/local_config');
            global.config = mix(require('./config/master_config'))
                .into(require('./config/local_config'));
        } catch (err) {
            console.error('No local configurations found in config/ Error=' + JSON.stringify(err));
            global.config = require('./config/master_config');
        }

        global.getDatabase_url = function() {
            if (global.config.database_url) {
                return global.config.database_url;
            } else {
                database_url = 'postgres://' + global.config.database.user +
                    ':' + global.config.database.password +
                    '@' + global.config.database.host +
                    ':' + global.config.database.port +
                    '/' + global.config.database.database;
                return database_url;
            }
        }

        global.getUtil = require('util');

        global.BASE_URL = 'http://' + global.config.server.ip + ':' + global.config.server.port + '/';
        global.CONTROLLER_DIR = dirBase + '/app/controllers/';
        global.MODEL_DIR = dirBase + '/app/models/';
        global.REPOSITORY_DIR = dirBase + '/app/repositories/';
        global.API_DIR = dirBase + '/app/api/';
        global.BASE_DIR = dirBase + '/app/base/';

        global.Promise = require('promise');

        global.getdbConnection = function(){
            return require('pg');
        }

        global.generateUUID = function() {
            var uuid = require('uuid');
            return uuid.v4();
        }

        global.getAuthorization = function() {
            return require('express-authorization');
        }

        global.getExpressSession = function() {
            return require('express-session');
        }

        global.getController = function(controllerName) {
            var Controller = require(global.CONTROLLER_DIR + controllerName);
            return mix(getBase('counter-controller')).into(new Controller());
        }

        global.getApi = function(apiName) {
            var api = require(global.API_DIR + apiName);
            return mix(getBase('counter-api')).into(new api());
        }

        global.getRepository = function(repositoryName) {
            var repository = require(global.REPOSITORY_DIR + repositoryName);
            return mix(getBase('counter-repository')).into(new repository());
        }

        global.getBase = function(base) {
            var baseController = require(global.BASE_DIR + base);
            return new baseController();
        }

        global.getModel = function(modelName) {
            var Model = require(global.MODEL_DIR + modelName);
            return new Model();
        }


        global.generatePasswordHash = function(password, salt) {
            var shasum = global.getSHA1();
            shasum.update(salt + password + salt);
            var hash = shasum.digest('hex');
            return hash;
        }

        global.getCrypt = function() {
            return require('crypto');
        }

        global.getSHA1 = function() {
            var crypt = global.getCrypt();
            var shasum = crypt.createHash('sha1');
            return shasum;
        }

        global.getValidator = function() {
            var validator = require('validator');
            validator.extend('isPassword', function(str) {
                // TODO: Finish writing the regex to test passwords
                if (!str) {
                    return false;
                }
                return true;
                //return /^$/.test(str);
            });
            return new Validator();
        }

        global.getDateFormatter = function() {
            return require('dateformat');
        }

        global.smtpTransport = require("nodemailer").createTransport(global.config.email);


        global.logger = require('./lib/logger').init();
        global.models = require("./models");

        // global.Sequelize = require('sequelize');
        // require('./model.bak/database.js').init(global.config.database, function(models){
        //     global.models = models;
        // });
    }
}
