"use strict";

module.exports = {

    setup: function(app) {
        var authorization = GLOBAL.getAuthorization();
        var routerWeb = require('express').Router();

        // setup permission
        var isAuthorizedSuperAdmin = authorization.ensureRequest.
        isPermitted(['user:permission:superadmin']);

        var isAuthorizedAdmin = authorization.ensureRequest.
        isPermitted(['user:permission:admin']);

        var isAuthorized = authorization.ensureRequest.
        isPermitted(['user:permission:user',
            'user:permission:employee',
            'user:permission:admin',
            'user:permission:superadmin'
        ]);

        var wr = {
            'login': '/login',
            'dashboard': '/dashboard',
            'profile': '/profile',
            'changepassword': '/password',
            'logout': '/logout',
            'superadmin': '/admin',
            'bad': '/*'
        }

        var sess;

        routerWeb.use(function timeLog(req, res, next) {
            //TODO: added a object in here that passes isAuth to the front-end;
            // console.log('Time: ', Date.now());
            next();
        });

        routerWeb.get("/", isAuthorized, function(req, res) {
            res.render('pages/dashboard', {
                data: {
                    user: req.session.user
                }
            });
        });

        routerWeb.get("/dashboard", isAuthorized, function(req, res) {
            if (req.session && req.session.user) { // Check if session exists
                // lookup the user in the DB by pulling their email from the session
                // User.findOne({ email: req.session.user.email }, function(err, user) {
                //     if (!user) {
                //         // if the user isn't found in the DB, reset the session info and
                //         // redirect the user to the login page
                //         req.session.reset();
                //         res.redirect('/login');
                //     } else {
                //         // expose the user to the template
                //         res.locals.user = user;

                //         // render the dashboard page
                //         res.render('dashboard.jade');
                //     }
                // });
                // res.locals.user = user;
                res.render('pages/dashboard', {
                    data: {
                        user: req.session.user
                    }
                });
            } else {
                res.redirect('/login');
            }
        });

        routerWeb.get('/login', function(req, res) {
            if (req.session.user) {
                res.redirect('/dashboard');
            } else {
                res.render('pages/login', { 
                    data: { first_name: "Jerum",
                            last_name: "Hubbert",
                            ts: Date.now()}
                        });
            }
        });


        routerWeb.get('/profile', isAuthorized, function(req, res) {
            res.render('pages/profile', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get(wr['superadmin'], isAuthorizedAdmin, function(req, res) {
            res.render('pages/superadmin', {
                data: {
                    user: 'jerum hubbert2'
                }
            });
        });
        routerWeb.get(wr['changepassword'], isAuthorized, function(req, res) {
            res.render('pages/password', {
                data: {
                    user: 'jerum hubbert3'
                }
            });
        });
        routerWeb.get(wr['logout'], function(req, res) {
            req.session.destroy();
            res.redirect('/');
        });

        routerWeb.get('/*', function(req, res, next) {
            if (req.originalUrl.split('/').indexOf('api') > -1) {
                next();
            } else if (req.session.user) {
                res.render('pages/badURL', {
                    data: {}
                });
            } else {
                res.redirect('/login');
            }

        });

        app.use('', routerWeb);
    }
};
