"use strict";
var version  = "/api/v1";

module.exports = {
    setup: function(app) {

        // Register account
        app.all(version + '/registration', function(req, res) {
            var accountController = getController('account-controller');
            accountController.rest(req, res);
        });

        // Account Controller - This should do control any call account related.
        app.all(version + '/account/*', function(req, res) {
            getController('account-controller').rest(req, res);
        });

        // Verify account
        app.post(version + '/verify', function(req, res) {
            getController('account-controller').verify(req, res);
        });

        // Reset password
        app.post(version + '/reset', function(req, res) {
            getController('account-controller').reset(req, res);
        });
    },
};
