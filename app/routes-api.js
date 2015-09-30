"use strict";

module.exports = {
    setup: function(app) {

        // Register account
        app.post('/api/register', function(req, res) {
            getController('AccountController').register(req, res);
        });

        // Login account
        app.post('/api/login', function(req, res) {
            //TODO: tmp code so I can work on login
            req.session.user = {
                username: "root",
                permissions: ['session:*']
            };
            if (req.session.user) {
                //TODO: need to makes a message.resourse file so we can keep all the strings in it.
                res.status(200).json({
                    user: req.session.user,
                    message: 'completed'
                });
            } else {
                res.status(400).send('Wrong username/password.');
            }

            // getController('AccountController').login(req, res);
        });

        app.get('/api/login', function(req, res) {
            //TODO: tmp code so I can work on login
            if (req.session.user) {
                res.status = 200;
                res.json({
                    user: req.session.user,
                    message: 'completed'
                });
            } else {
                res.status = 400;
                res.json({
                    message: 'User not logged in.'
                });
            }
            // getController('AccountController').login(req, res);
        });


        // Verify account
        app.post('/api/verify', function(req, res) {
            getController('AccountController').verify(req, res);
        });

        // Reset password
        app.post('/api/reset', function(req, res) {
            getController('AccountController').reset(req, res);
        });
    },
};
