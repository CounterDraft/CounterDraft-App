"use strict";

module.exports = {

    setup: function(app) {
        var authorization = global.getAuthorization();
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

        var sess;

        routerWeb.get("/", isAuthorized, function(req, res) {
            res.render('pages/dashboard', {
                data: {
                    user: req.session.user
                }
            });
        });

        routerWeb.get("/dashboard", isAuthorized, function(req, res) {
            if (req.session && req.session.user) {
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
                var Organization_types = models.organization_type;
                Organization_types.all().then(function(organization_types) {
                    res.render('pages/login', {
                        data: {
                            organization_types: organization_types,
                            ts: Date.now()
                        }
                    });
                });
            }
            return false;
        });


        routerWeb.get('/profile', isAuthorized, function(req, res) {
            res.render('pages/profile', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/superadmin', isAuthorizedAdmin, function(req, res) {
            res.render('pages/superadmin', {
                data: {
                    user: 'jerum hubbert2'
                }
            });
        });
        routerWeb.get('/changepassword', isAuthorized, function(req, res) {
            res.render('pages/password', {
                data: {
                    user: 'jerum hubbert3'
                }
            });
        });
        routerWeb.get('/logout', function(req, res) {
            req.session.destroy();
            res.redirect('/');
        });

        routerWeb.get('/*', function(req, res, next) {
            if (req.originalUrl.split('/').indexOf('api') > -1 || req.originalUrl.split('/').indexOf('application') > -1) {
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
