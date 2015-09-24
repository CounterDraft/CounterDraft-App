 "use strict"; //Defines that JavaScript code should be executed in "strict mode".

 var authorization = require('express-authorization');

 var nonAuthView = 'pages/login';

 var br = '/';

 var wr = {
     'login': 'login',
     'dashboard': 'dashboard',
     'profile': 'profile',
     'changepassword': 'password'
 }

 module.exports = {

     app: null,

     init: function(app) {
         this.app = app;
         this.setRouters();
         return true;
     },

     setRouters: function() {
         this.app.get(br,
             authorization.ensureRequest.isPermitted(nonAuthView),
             function(req, res) {
                 //TODO: Call the api for stuff we need for page
                 res.render('pages/dashboard');
             }).get(br + wr['dashboard'],
             authorization.ensureRequest.isPermitted(nonAuthView),
             function(req, res) {

                 res.render('pages/dashboard');
             }).get(br + wr['profile'],
             authorization.ensureRequest.isPermitted(nonAuthView),
             function(req, res) {

                 res.render('pages/profile');
             }).get(br + wr['changepassword'],
             authorization.ensureRequest.isPermitted(nonAuthView),
             function(req, res) {

                 res.render('pages/password');
             }).get(br + wr['login'],
             function(req, res) {
                 res.render('pages/login');
             }).get(br + "*",
             authorization.ensureRequest.isPermitted(nonAuthView),
             function(req, res) {

                 res.render('pages/badURL');
             });
         return false;
     }

 }
