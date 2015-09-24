 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var br = '/api';

 var ar = {
     'login': '/login',
     'registration': '/registration',
     'createGame': '/createGame'
 }

 module.exports = {
     app: null,

     init: function(app) {
         this.app = app;
         this.setRouters();
         return true;
     },

     setRouters: function() {
         this.app.post(br + ar['login'], function(req, res) {
            //calls the loggin controller and controllers calls loginApi;
             req.session.user = {
                 username: "root",
                 permissions: ['session:*']
             };
             res.redirect('/');
         });


         return false;
     }

 }
