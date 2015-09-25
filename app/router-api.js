 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var connectionFactory = require('./connectionFactory');
 var express = require('express');
 var routerApi = express.Router();

 var ar = {
     'login': '/login',
     'registration': '/registration',
     'createGame': '/createGame'
 }

 routerApi.use(function timeLog(req, res, next) {
     console.log('Time: ', Date.now());
     next();
 });

 routerApi.get('/', function(req, res) {
     res.status = 200;
     res.json({
         status: 'Completed'
     });
 });

 routerApi.get(ar['login'], function(req, res) {
     if (req.session.user) {
         res.status = 200;
         res.json({
             session: req.session.user,
             status: 'Completed'
         });
     } else {
         res.status = 401;
         res.json({
             message: 'Patron is not logged in.',
             status: 'Completed'
         });
     }
 });

 routerApi.post(ar['login'], function(req, res) {
     //calls the login controller and controllers calls loginApi;
     //need to save the data to the session table on the database;
     req.session.user = {
         username: "root",
         permissions: ['session:*']
     };
     if (req.session.user) {
         //TODO: need to makes a message.resourse file so we can keep all the strings in it.
         res.status = 200;
         res.json(req.session.user);
     } else {
         res.status = 400;
         res.json({
             error: 'Bad username/password'
         });
     }
 });

 routerApi.delete(ar['login'], function(req, res) {
     if (req.session.user) {
         req.session.destroy();
         res.status = 200;
         res.json({
             status: 'Completed'
         });
     } else {
         res.status = 401;
         res.json({
             message: 'Patron is not logged in.',
             status: 'Completed'
         });
     }
 });
 
 module.exports = routerApi;
