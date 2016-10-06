"use strict";
var version  = "/api/v1";

module.exports = {
    setup: function(app) {
        
        //used for checking errors;
        var CONTROLLERS = [
            'registration',
            'patron',
            'account',
            'dashboard',
            'verify',
            'reset',
            'application'
        ];

        // Register account
        app.all(version + '/:type(registration)/:id(*)', function(req, res) {
           getController('account-controller').rest(req, res);
        });

        app.all(version + '/:type(patron)/:id(*)', function(req, res) {
            getController('patron-controller').rest(req, res);
        });

        // Account Controller - This should do control any call account related.
        app.all(version + '/:type(account)/:id(*)', function(req, res) {
            getController('account-controller').rest(req, res);
        });

        // Dashboard Controller
        app.all(version + '/:type(dashboard)/:id(*)', function(req, res) {
            getController('dashboard-controller').rest(req, res);
        });

        // Verify account
        app.all(version + '/:type(verify)/:id(*)', function(req, res) {
            getController('account-controller').rest(req, res);
        });

        // Reset password
        app.all(version + '/:type(reset)/:id(*)', function(req, res) {
            getController('account-controller').rest(req, res);
        });

        // Application servers.
        app.all(version +'/:type(application)/:id(*)', function(req, res){
            getController('application-controller').rest(req, res);
        });

        // Error router.
        app.all(version +'/:type(*)', function(req, res){
            var error = require(GLOBAL.API_DIR + 'error-api');
            var errorApi = new error();
            if(req.params['type'] && CONTROLLERS.indexOf(req.params['type']) > -1){
                var urlWithSlash = req.url + '/';
                res.redirect(urlWithSlash);
            }else{
                errorApi.sendError(1024, 422, res);
            }
        });
    },
};
