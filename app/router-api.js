 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var baseRouter = '/api';

 var ApiRouters = {
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
         console.log('setting the routers for api');
         return false;
     }

 }
