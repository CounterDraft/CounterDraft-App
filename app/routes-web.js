"use strict";

module.exports = {
	setup: function(app) {
		var authorization = GLOBAL.getAuthorization();
		
		// setup permission
		var isAdmin = authorization.ensureRequest.isPermitted('admin:*');
		var isLoggedIn = authorization.ensureRequest.isPermitted('session:active');
		
		var br = '/';
		
		var wr = {
			'login': 'login',
			'dashboard': 'dashboard',
			'profile': 'profile',
			'changepassword': 'password',
			'logout': 'logout',
			'superadmin': 'admin'
		}
		
		app.get(br, isLoggedIn, function(req, res) {
             //TODO: Call the api for stuff we need for page
             res.render('pages/dashboard',{});
         });

		 app.get(br + wr['dashboard'], isLoggedIn, function(req, res) {
             res.render('pages/dashboard', {});
         });

		 app.get(br + wr['profile'], isLoggedIn, function(req, res) {
             res.render('pages/profile', {});
         });

         //Need to ensure they are logged in and are admin loggedIn.
         app.get(br + wr['superadmin'], isAdmin,function(req, res) {
             res.render('pages/superadmin',{ });
         });
		 
		 app.get(br + wr['changepassword'], isLoggedIn, function(req, res) {
             res.render('pages/password');
         });
		 
		 app.get(br + wr['logout'], function(req, res) {
             req.session.destroy();
             res.redirect(br);
         });
         
		 //defaults if they fail to auth per framework
         app.get(br + wr['login'], function(req, res) {
             res.render('pages/login');
         });
		 
		 app.get(br + "*", isLoggedIn, function(req, res) {
             res.render('pages/badURL');
         });
	}
};