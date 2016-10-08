"use strict";

module.exports = {

    setup: function(app) {
        var routerWeb = require('express').Router();

        var authorization = global.getAuthorization();
        authorization.ensureRequest.options = {
            onDenied: function(req, res, next) {
                var _path = '';
                if (req.route['path']) {
                    var arr = req.route['path'].split('/');
                    _path = arr[1];
                }

                if (!req.session.user) {
                    res.redirect('/login');
                } else {
                    res.render('pages/unauthorized.ejs', {
                        data: {
                            user: req.session.user,
                            path: _path
                        }
                    });
                }
            }
        }

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
                res.render('pages/dashboard.ejs', {
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
                    res.render('pages/login.ejs', {
                        data: {
                            organization_types: organization_types,
                            ts: Date.now()
                        }
                    });
                });
            }
        });
        routerWeb.get('/game', isAuthorized, function(req, res) {
            res.render('pages/game.ejs', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });

        routerWeb.get('/patron', isAuthorized, function(req, res) {
            var user = req.session.user;
            if (!user.employee_id) {
                // res.redirect('/logout');
            }
            getApi('employee-api').retrieve(user.employee_id)
                .then(function(results) {
                    var employee = results.dataValues;
                    return getApi('organization-api').retrieve(employee.employee_organization);
                }).then(function(results) {
                    var organization = results.dataValues;
                    res.render('pages/patron.ejs', {
                        data: {
                            organization: {
                                name: organization.name,
                                id: organization.id,
                                description: organization.description
                            }
                        }
                    });
                }).catch(function(err) {
                    logger.log('Error', 'Failed to retrieve employee, check database connection.', { error: err });
                    // res.redirect('/logout');
                });
        });


        routerWeb.get('/profile', isAuthorized, function(req, res) {
            res.render('pages/profile.ejs', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/organization', isAuthorizedAdmin, function(req, res) {
            res.render('pages/organization.ejs', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/reports', isAuthorized, function(req, res) {
            res.render('pages/reports.ejs', {
                data: {
                    user: 'jerum hubbert1'
                }
            });
        });
        routerWeb.get('/confirmation', function(req, res) {
            if (req.session.user) {
                res.redirect('/dashboard');

            } else {
                res.locals.login = false;
                getApi('registration-api').confirmRegistation(req, res)
                    .then(function(data) {
                        res.render('pages/confirmation.ejs', {
                            data: {email_address: data.email_address}
                        });
                    }).catch(function(error) {
                        res.render('pages/confirmation.ejs', {
                            data: error
                        });
                    });
            }

        });
        routerWeb.get('/settings', isAuthorized, function(req, res) {
            res.render('pages/reports.ejs', {
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
                res.render('pages/badURL.ejs', {
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
