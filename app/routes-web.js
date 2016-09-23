"use strict";

module.exports = {

    setup: function(app) {
        var authorization = global.getAuthorization();
        authorization.ensureRequest.options = {
            onDenied: function(req, res, next){
                var _path = '';
                if(req.route['path']){
                    var arr = req.route['path'].split('/');
                    _path = arr[1];
                }

                res.render('pages/unauthorized', {
                    data: {
                        user: req.session.user,
                        path: _path
                    }
                });
            }
        }
        var routerWeb = require('express').Router();

        // setup permission
        var isAuthorizedSuperAdmin = authorization.ensureRequest.
        isPermitted('restricted:superadmin');

        var isAuthorizedAdmin = authorization.ensureRequest.
        isPermitted('restricted:admin');

        var isAuthorized = authorization.ensureRequest.
        isPermitted('restricted:employee');

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
        routerWeb.get('/game', isAuthorizedAdmin, function(req, res) {
            res.render('pages/game', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/patron', isAuthorized, function(req, res) {
            res.render('pages/patron', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/profile', isAuthorized, function(req, res) {
            res.render('pages/profile', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/organization', isAuthorized, function(req, res) {
            res.render('pages/organization', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/reports', isAuthorized, function(req, res) {
            res.render('pages/reports', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/settings', isAuthorized, function(req, res) {
            res.render('pages/reports', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/logout', function(req, res) {
            req.session.destroy();
            res.redirect('/login');
        });

        routerWeb.get('/*', function(req, res, next) {
            if (req.originalUrl.split('/').indexOf('api') > -1 || req.originalUrl.split('/').indexOf('application') > -1) {
                next();
            } else if (req.session.user) {
                res.render('pages/badURL', {
                    data: {
                        user: req.session.user
                    }
                });
            } else {
                res.redirect('/login');
            }

        });

        app.use('', routerWeb);
    }
};
