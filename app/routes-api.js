"use strict";
var version  = "/api/v1";

module.exports = {
    setup: function(app) {

        // Register account
        app.all(version + '/registration/*', function(req, res) {
           getController('account-controller').rest(req, res);
        });

        // Account Controller - This should do control any call account related.
        app.all(version + '/account/*', function(req, res) {
            getController('account-controller').rest(req, res);
        });

        // Dashboard Controller
        app.all(version + '/dashboard/*', function(req, res) {
            getController('dashboard-controller').rest(req, res);
        });

        // Verify account
        app.all(version + '/verify/*', function(req, res) {
            getController('account-controller').rest(req, res);
        });

        // Reset password
        app.all(version + '/reset/*', function(req, res) {
            getController('account-controller').rest(req, res);
        });

        // Application servers.
        app.all(version +'/application/*', function(req, res){
            getController('application-controller').rest(req, res);
        })
    },
};
