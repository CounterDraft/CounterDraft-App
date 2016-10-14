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

        //pre-route
        app.use(function(req, res, next) {
            var organizationModal = models.organization;
            var employeeModal = models.employee_user;
            var user = null;

            //defaults variables;
            res.locals.login = false;
            res.locals.environment = global.config['environment'];
            res.locals.npm_package_name = global.config['npm_package_name'];

            if (typeof req.session.user != 'undefined') {
                res.locals.login = true;
            }

            //create the api_user object;
            if (!req.hasOwnProperty('session')) {
                req.session = {};
                req.session.api_user = {};
                req.session.organization = {};
            }

            //gets data from header and addes it to the api_user
            if (!res.locals.login && req.headers && req.get('key') && req.get('employee_id')) {
                var key = req.get('key');
                var employee_id = req.get('employee_id');
                organizationModal.findOne({
                    where: {
                        api_key: key
                    }
                }).then(function(result) {
                    if (result) {
                        req.session.organization = result.dataValues;
                    } else {
                        var err = {
                            key: key,
                            modal: 'organization'
                        };
                        logger.log('Error', 'Couldn\'t find organization in db', { error: err });
                    }
                    return employeeModal.findOne({
                        where: {
                            id: employee_id
                        }
                    });
                }).then(function(result) {
                    if (result) {
                        req.session.api_user = result.dataValues;
                    } else {
                        var err = {
                            employee_id: employee_id,
                            modal: 'employee'
                        };
                        logger.log('Error', 'Couldn\'t find employee in db', { error: err });
                    }

                    //keep going;
                    next();
                    
                }).catch(function(err) {
                    getApi('error').setErrorWithMessage(err.toString(), 500, res);
                    return;
                });
            } else {
                //keep going;
                next();
            }
        });

        app.use('', routerWeb);
    }
};
