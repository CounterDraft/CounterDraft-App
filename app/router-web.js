 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
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
         this.app.get(br, function(req, res) {
            //TODO: Call the api for stuff we need for page
             res.render('pages/login');
         }).get(br + wr['login'], function(req, res){
            
            res.render('pages/login');
         }).get(br + wr['dashboard'], function(req, res){

            res.render('pages/dashboard');
         }).get(br + wr['profile'], function(req, res){

            res.render('pages/profile');
         }).get(br + wr['changepassword'], function(req, res){
            
            res.render('pages/password');
         });
         return false;
     }

 }
