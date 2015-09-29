"use strict";

module.exports = {

    setup: function(app) {
        var authorization = require('express-authorization');
        var routerWeb = require('express').Router();

        // setup permission
        var isAuthorizedAdmin = authorization.ensureRequest.isPermitted('admin:*');
        var isAuthorized = authorization.ensureRequest.isPermitted('session:active');

        var wr = {
            'login': '/login',
            'dashboard': '/dashboard',
            'profile': '/profile',
            'changepassword': '/password',
            'logout': '/logout',
            'superadmin': '/admin',
            'bad': '/*'
        }

        routerWeb.use(function timeLog(req, res, next) {
            //TODO: added a object in here that passes isAuth to the front-end;
            // console.log('Time: ', Date.now());
            next();
        });

        routerWeb.get('/', isAuthorized, function(req, res) {
            //TODO: Call the api for stuff we need for page
            res.render('pages/dashboard', {
                data: {
                    user: 'jerum hubbert'
                }
            });
        });

        routerWeb.get(wr['login'], function(req, res) {
            res.render('pages/login', {
                data: {
                    user: 'jerum hubbert'
                }
            });
        });

        routerWeb.get(wr['dashboard'], isAuthorized, function(req, res) {
            res.render('pages/dashboard', {
                data: {
                    user: 'jerum hubbert'
                }
            });
        });
        routerWeb.get(wr['profile'], isAuthorized, function(req, res) {
            res.render('pages/profile', {
                data: {
                    user: 'jerum hubbert'
                }
            });
        });
        routerWeb.get(wr['superadmin'], isAuthorizedAdmin, function(req, res) {
            res.render('pages/superadmin', {
                data: {
                    user: 'jerum hubbert'
                }
            });
        });
        routerWeb.get(wr['changepassword'], isAuthorized, function(req, res) {
            res.render('pages/password', {
                data: {
                    user: 'jerum hubbert'
                }
            });
        });
        routerWeb.get(wr['logout'], function(req, res) {
            req.session.destroy();
            res.redirect('/');
        });

        routerWeb.get(wr['bad'], function(req, res, next) {
            var data = {
                user: 'jerum hubbert'
            }

            if (req.originalUrl.split('/').indexOf('api') > -1) {
                next();
            } else if (req.session.user) {
                res.render('pages/badURL', {
                    data: data
                });
            } else {
                res.redirect('/login');
            }

        });

        app.use('', routerWeb);
    }
}
