"use strict";

module.exports = {
    setup: function(app) {

        // Register account
        app.all('/api/register', function(req, res) {
            var accountController = getController('account-controller');
            accountController.rest(req, res);
        });

        // Account Controller - This should do control any call account related.
        app.all('/api/account/*', function(req, res) {
            getController('account-controller').rest(req, res);
        });

        // Verify account
        app.post('/api/verify', function(req, res) {
            getController('account-controller').verify(req, res);
        });

        // Reset password
        app.post('/api/reset', function(req, res) {
            getController('account-controller').reset(req, res);
        });
    },
};
