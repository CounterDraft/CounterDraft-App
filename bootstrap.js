module.exports = {
    init: function() {
        GLOBAL.dirBase = process.env.PWD;
        GLOBAL.mix = require('mix-into');

        // Setup the configuration
        GLOBAL.config = mix(require('./config/master_config'))
                            .into(require('./config/local_config'));

        GLOBAL.getUtil = require('util');

        GLOBAL.BASE_URL = 'http://' + GLOBAL.config.server.ip + ':' + GLOBAL.config.server.port + '/';
        GLOBAL.CONTROLLER_DIR = dirBase +'/app/controllers/';
        GLOBAL.MODEL_DIR = dirBase + '/app/models/';
        GLOBAL.REPOSITORY_DIR = dirBase + '/app/repositories/';
        GLOBAL.API_DIR = dirBase + '/app/api/';
        GLOBAL.BASE_DIR = dirBase + '/app/base/';

        GLOBAL.Promise = require('promise');

        GLOBAL.generateUUID = function() {
            var uuid = require('uuid');
            return uuid.v4();
        }

        GLOBAL.getAuthorization = function() {
            return require('express-authorization');
        }

        GLOBAL.getExpressSession = function() {
            return require('express-session');
        }

        GLOBAL.getController = function(controllerName) {
            var Controller = require(GLOBAL.CONTROLLER_DIR + controllerName);
            return mix(new Controller(), [getBase('counter-controller')]);
        }

        GLOBAL.getApi = function(apiName) {
            var api = require(GLOBAL.API_DIR + apiName);
            return mix(new api(), [getBase('counter-api')]);
        }

        GLOBAL.getRepository = function(repositoryName) {
            var repository = require(GLOBAL.REPOSITORY_DIR + repositoryName);
            return mix(new repository(), [getBase('counter-repository')]);
        }

         GLOBAL.getBase = function(base) {
            var baseController = require(GLOBAL.BASE_DIR + base);
            return new baseController();
        }

        GLOBAL.getModel = function(modelName) {
            var Model = require(GLOBAL.MODEL_DIR + modelName);
            return new Model();
        }


        GLOBAL.generatePasswordHash = function(password, salt) {
            var shasum = GLOBAL.getSHA1();
            shasum.update(salt + password + salt);
            var hash = shasum.digest('hex');
            return hash;
        }

        GLOBAL.getCrypt = function() {
            return require('crypto');
        }

        GLOBAL.getSHA1 = function() {
            var crypt = GLOBAL.getCrypt();
            var shasum = crypt.createHash('sha1');
            return shasum;
        }

        GLOBAL.getValidator = function() {
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

        GLOBAL.getDateFormatter = function() {
            return require('dateformat');
        }

        GLOBAL.smtpTransport = require("nodemailer").createTransport(GLOBAL.config.email);
        GLOBAL.logger = require('./lib/logger');

        //database setup & makes GLOBAL.models object;
        GLOBAL.Sequelize = require('sequelize');
        var sequelize = require('./database.js').init(GLOBAL.config.database);
        
    }
}
