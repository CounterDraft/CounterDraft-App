 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var connectionFactory = require('./connectionFactory');


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
             //calls the login controller and controllers calls loginApi;
             //need to save the data to the session table on the database;
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
         });
     }

 }
