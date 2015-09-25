"use strict";

module.exports = {
	setup: function(app) {
		// Register account
		app.post('/register', function(req, res) {
			getController('AccountController').register(req, res);
		});
		
		// Login account
		app.post('/login', function(req, res) {
			/*
			req.session.user = {
                 username: "root",
                 permissions: ['session:*']
             };
             if (req.session.user) {
                //TODO: need to makes a message.resourse file so we can keep all the strings in it.
                 res.status(200).send('Session has been created.');
             } else {
                 res.status(400).send('Wrong username/password.');
             }
			*/
			getController('AccountController').login(req, res);
		});
		
		// Verify account
		app.post('/verify', function(req, res) {
			getController('AccountController').verify(req, res);
		});
		
		// Reset password
		app.post('/reset', function(req, res) {
			getController('AccountController').reset(req, res);
		});
	},
};