 "use strict"; //Defines that JavaScript code should be executed in "strict mode".

 var authorization = require('express-authorization');

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

 module.exports = {

     app: null,

     init: function(app) {
         this.app = app;
         this.setRouters();
         return true;
     },

     setRouters: function() {
         this.app.get(br, isLoggedIn, function(req, res) {
             //TODO: Call the api for stuff we need for page
             res.render('pages/dashboard',{});

         }).get(br + wr['dashboard'], isLoggedIn, function(req, res) {
             res.render('pages/dashboard', {});

         }).get(br + wr['profile'], isLoggedIn, function(req, res) {
             res.render('pages/profile', {});

         })
         //Need to ensure they are logged in and are admin loggedIn.
         .get(br + wr['superadmin'], isAdmin,function(req, res) {
             res.render('pages/superadmin',{ });

         }).get(br + wr['changepassword'], isLoggedIn, function(req, res) {
             res.render('pages/password');

         }).get(br + wr['logout'], function(req, res) {
             req.session.destroy();
             res.redirect(br);
         })
         //defaults if they fail to auth per framework
         .get(br + wr['login'], function(req, res) {
             res.render('pages/login');

         }).get(br + "*", isLoggedIn, function(req, res) {
             res.render('pages/badURL');

         });
         return false;
     }

 }
