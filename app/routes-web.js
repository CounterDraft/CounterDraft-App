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

        routerWeb.get("/", isAuthorized, function(req, res) {
            res.redirect("/dashboard");
        });

        routerWeb.get("/dashboard", isAuthorized, function(req, res) {
            if (req.session && req.session.user) {
                var time_spans = getApi("dashboard").getTimeSpans().enums;
                var user_data = {
                    employee_id: req.session.user.id,
                    username: req.session.user.username,
                    first_name: req.session.user.first_name,
                    last_name: req.session.user.last_name,
                    email_address: req.session.user.email_address
                }
                res.render("pages/dashboard.ejs", {
                    data: {
                        user: user_data,
                        timeSpans: time_spans
                    }
                });
            } else {
                res.redirect("/login");
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
                    user: 'counterDraft_user'
                }
            });
        });

        routerWeb.get('/patron', isAuthorized, function(req, res) {
            var user = req.session.user;
            if (!user.employee_id) {
                res.redirect('/logout');
            }
            getApi('employee').retrieve(user.employee_id)
                .then(function(results) {
                    var employee = results.dataValues;
                    return getApi('organization').retrieve(employee.employee_organization);
                }).then(function(results) {
                    var organization = results.dataValues;
                    res.render('pages/patron.ejs', {
                        data: {
                            organization: {
                                name: organization.name,
                                id: organization.id,
                                description: organization.description
                            },
                            dir: {
                                image_dir: global.config['image_dir'],
                                image_bucket_url: global.config['image_bucket_url']
                            }
                        }
                    });
                }).catch(function(err) {
                    logger.log('Error', 'Failed to retrieve employee, check database connection.', { error: err });
                    res.redirect('/logout');
                });
        });


        routerWeb.get('/profile', isAuthorized, function(req, res) {
            res.render('pages/profile.ejs', {
                data: {
                    user: 'counterDraft_user'
                }
            });
        });
        routerWeb.get('/organization', isAuthorizedAdmin, function(req, res) {
            res.render('pages/organization.ejs', {
                data: {
                    user: 'counterDraft_user'
                }
            });
        });
        routerWeb.get('/reports', isAuthorized, function(req, res) {
            res.render('pages/reports.ejs', {
                data: {
                    user: 'counterDraft_user'
                }
            });
        });
        routerWeb.get('/confirmation', function(req, res) {
            if (req.session.user) {
                res.redirect('/dashboard');

            } else {
                res.locals.login = false;
                getApi('registration').confirmRegistation(req, res)
                    .then(function(data) {
                        res.render('pages/confirmation.ejs', {
                            data: { email_address: data.email_address }
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
                    user: 'counterDraft_user'
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
