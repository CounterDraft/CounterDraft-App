"use strict";
var version  = "/api/v1";

module.exports = {
    setup: function(app) {

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
            var ea = require(GLOBAL.API_DIR + 'error-api');
            var errorApi = new ea();
            if(req.params['type']){
                //TODO: add a '/' to the end of the call and redirect it.
                errorApi.setErrorWithMessage(req.params['type'] + ' cannot be called at this time.', 422, res);
            }else{
                errorApi.sendError(1024, 422, res);
            }
        });
    },
};
