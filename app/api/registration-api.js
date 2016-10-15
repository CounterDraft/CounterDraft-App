"use strict";

var _generateApiKey = function() {
    var uuid = generateUUID().replace(/-/g, "");
    if (uuid) {
        return uuid;
    } else {
        //placeholder uuid;
        return '110E8400E29B11D4A716446655440000';
    }
}

var _sendRegistrationEmail = function(user_email, errorMsg, errorNumber, errorMsgEmail, errorNumberEmail) {
    var Promise = getPromise();
    var eTemplate = getEmailTemplate();
    var ModelRegistrationUser = models.registration_user;
    var currentTime = new Date();

    new Promise(function(resolve, reject) {
        require('crypto').randomBytes(48, function(err, buffer) {
            var genToken = buffer.toString('hex');
            if (genToken) {
                return resolve(genToken);
            } else {
                return reject(err);
            }
        });
    }).then(function(token) {
        var vUntil = currentTime.setDate(currentTime.getDate() + 14);
        return ModelRegistrationUser.create({
            email_address: user_email,
            token: token,
            valid_until: vUntil
        });
    }).then(function(registration_user) {
        if (!registration_user) {
            var eo = {
                email_address: user_email,
                error: errorNumber
            }
            logger.error(errorMsg, {
                error: eo
            });
            return new Promise(function(resolve, reject) {
                return reject(eo);
            });
        }
        return new Promise(function(resolve, reject) {
            //TODO: fix this so we can use templates and look pretty;
            // var sendRegistrationConfirmation = emailTransport.templateSender(new eTemplate('templates/email/registration-confirmation.html'), sendRegistrationConfirmationEmailOptions);

            // sendRegistrationConfirmation({

            //     }, {

            //     },
            //     function(err, data) {
            //         if (err) {
            //             var eo = {
            //                 email_address: user_email,
            //                 error: errorNumberEmail
            //             }
            //             logger.error(errorMsgEmail, {
            //                 error: eo
            //             });
            //             return reject(err);
            //         } else {
            //             logger.info('Email confirmation sent to', { email_address: user_email });
            //             return resolve(data);
            //         }
            //     });

            var url_link;
            if (global.config.environment === 'production') {
                url_link = 'http://' + config.server.ip + '/confirmation?token=' + registration_user.dataValues.token;
            } else {
                url_link = 'http://' + config.server.ip + ':' + config.server.port + '/confirmation?token=' + registration_user.dataValues.token;
            }

            var sendRegistrationConfirmationEmailOptions = {
                from: '"Do-Not-Reply" <do-not-reply@counterDraft.com>',
                to: user_email,
                subject: 'Email Confirmation',
                html: '<div>Welcome to Counter Draft, a Fantasy sport experience!</div><br>' +
                    '<div>Please click on the link to confirmation your email and account</div><br>' +
                    '<a href="' + url_link + '">Confirmation</a>'
            };

            emailTransport.sendMail(sendRegistrationConfirmationEmailOptions, function(err, data) {
                if (err) {
                    var eo = {
                        email_address: user_email,
                        error: errorNumberEmail
                    }
                    logger.error(errorMsgEmail, {
                        error: eo
                    });
                    return reject(err);
                } else {
                    logger.info('Email confirmation sent to', { email_address: user_email });
                    return resolve(data);
                }
            });
        });
    });
}

function registationApi() {
    var self = this;
    var Promise = getPromise();
    this.tag = 'registation-api';
    var ModelRegistrationUser = models.registration_user;
    var ModelEmployee = models.employee_user;
    var ModelOrganization = models.organization;
    var ModelPatron = models.patron_player;

    this.registerUser = function(req, res) {
        if (!req.body.first_name || req.body.first_name === "") {
            this.getErrorApi().sendError(1003, 403, res);
        } else if (!req.body.last_name || req.body.last_name === "") {
            this.getErrorApi().sendError(1004, 403, res);
        } else if (!req.body.email_address || self.validEmail(req.body.email_address)) {
            this.getErrorApi().sendError(1005, 403, res);
        } else if (!req.body.password || req.body.password === "") {
            this.getErrorApi().sendError(1006, 403, res);
        } else if (!req.body.password_confirm || req.body.password_confirm === "") {
            this.getErrorApi().sendError(1007, 403, res);
        } else if (req.body.password_confirm != req.body.password) {
            this.getErrorApi().sendError(1014, 403, res);
        } else if ((!req.body.organization_name || req.body.organization_name === "") && !req.body.organization_type && (!req.body.organization_hash || req.body.organization_hash === "")) {
            this.getErrorApi().sendError(1015, 403, res);
        } else if (!req.body.organization_hash && !req.body.organization_type && req.body.organization_name) {
            this.getErrorApi().sendError(1016, 403, res);
        } else if (!req.body.organization_hash && req.body.organization_type && (!req.body.organization_name || req.body.organization_name === "")) {
            this.getErrorApi().sendError(1017, 403, res);
        } else {
            //code for organization hash should go here.
            var passwordWithHash = getHash().generate(req.body.password);
            var employeeOrganization = 999;

            if (!passwordWithHash) {
                this.getErrorApi().sendError(1013, 422, res);
                return;
            }

            ModelOrganization.create({
                name: req.body.organization_name,
                description: req.body.organization_description,
                has_multi_admin: true,
                type: req.body.organization_type,
                api_key: _generateApiKey()
            }).then(function(organization) {
                if (organization.dataValues.id) {
                    employeeOrganization = organization.dataValues.id;
                }
                return ModelEmployee.findAndCountAll({
                    where: {
                        email_address: req.body.email_address
                    }
                });
            }).then(function(results) {
                if (results.count > 0) {
                    return new Promise(function(resolve, reject) {
                        return reject(self.getErrorApi().getErrorMsg(1018));
                    });
                }
                return ModelPatron.findAndCountAll({
                    where: {
                        email_address: req.body.email_address
                    }
                });
            }).then(function(result) {
                if (result.count > 0) {
                    return new Promise(function(resolve, reject) {
                        return reject(self.getErrorApi().getErrorMsg(1018));
                    });
                }
                return ModelEmployee.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.email_address,
                    email_address: req.body.email_address,
                    password: passwordWithHash,
                    is_admin: true, //we are admin if we are createing the organization;
                    organization_id: employeeOrganization
                });
            }).then(function(employee) {
                if (typeof 'undefined' != employee && employee.$options['isNewRecord']) {
                    var emailErrorNumber = 9901
                    var sendEmailErrorNumber = 9902;

                    _sendRegistrationEmail(employee.dataValues.email_address,
                        self.getErrorApi().getErrorMsg(emailErrorNumber),
                        emailErrorNumber,
                        self.getErrorApi().getErrorMsg(sendEmailErrorNumber),
                        sendEmailErrorNumber);
                    return getApi('login').loginUser(req, employee.dataValues.email_address);
                } else {
                    return new Promise(function(resolve, reject) {
                        return reject(self.getErrorApi().getErrorMsg(1018));
                    });
                }
            }).then(function(employee) {
                res.status(200).json({
                    user: employee,
                    success: true
                });
            }).catch(function(err) {
                self.getErrorApi().setErrorWithMessage(err.toString(), 422, res);
            });
        }
    }

    this.createPatron = function(req, res) {
        var self = this;
        var user = req.session.user || req.sess;

        if (!req.body.first_name || req.body.first_name === "") {
            this.getErrorApi().sendError(1003, 403, res);
        } else if (!req.body.last_name || req.body.last_name === "") {
            this.getErrorApi().sendError(1004, 403, res);
        } else if (!req.body.email_address || self.validEmail(req.body.email_address)) {
            this.getErrorApi().sendError(1005, 403, res);
        } else if (!req.body.password || req.body.password === "") {
            this.getErrorApi().sendError(1006, 403, res);
        } else if (!req.body.password_confirm || req.body.password_confirm === "") {
            this.getErrorApi().sendError(1007, 403, res);
        } else if (req.body.password_confirm != req.body.password) {
            this.getErrorApi().sendError(1014, 403, res);
        }
        // else if (!req.body.organization || req.body.organization === "") {
        //     this.getErrorApi().sendError(1015, 403, res);
        // } 
        else {
            var passwordWithHash = getHash().generate(req.body.password);
            if (!passwordWithHash) {
                this.getErrorApi().sendError(1013, 422, res);
                return;
            }
            ModelPatron.findAndCountAll({
                where: {
                    email_address: req.body.email_address
                }
            }).then(function(results) {
                if (results.count > 0) {
                    return new Promise(function(resolve, reject) {
                        return reject(self.getErrorApi().getErrorMsg(1018));
                    });
                }

                return ModelEmployee.findAndCountAll({
                    where: {
                        email_address: req.body.email_address
                    }
                });
            }).then(function(results) {
                if (results.count > 0) {
                    return new Promise(function(resolve, reject) {
                        return reject(self.getErrorApi().getErrorMsg(1018));
                    });
                }
                return getApi('employee').retrieve(user.employee_id);
            }).then(function(results) {
                var employee = results.dataValues;
                return ModelPatron.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.email_address,
                    email_address: req.body.email_address,
                    password: passwordWithHash,
                    organization_id: employee.organization_id
                });
            }).then(function(results) {
                var patron = results.dataValues;
                var dataSave = {
                    first_name: patron.first_name,
                    last_name: patron.last_name,
                    username: patron.username,
                    email_address: patron.email_address,
                    organization_id: patron.organization_id
                }

                res.status(200).json({
                    user: dataSave,
                    success: true
                });
            }).catch(function(err) {
                self.getErrorApi().setErrorWithMessage(err.toString(), 422, res);
            });
        }
    }

    this.confirmRegistation = function(req, res) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var errorNumber = 1019;
            var errorNumberNotFound = 1020;
            var errorExpired = 1021;
            var errorTokenUsed = 1022;
            var token = req.query.token || null;
            var eo = {};
            if (!token) {
                return reject(self.getErrorApi().sendError(errorNumber, 422));
            }
            ModelRegistrationUser.findOne({ where: { token: token } })
                .then(function(registration_user) {
                    if (registration_user) {

                        //check valid until;
                        if ((new Date(registration_user.dataValues.valid_until) < new Date())) {
                            return reject(self.getErrorApi().sendError(errorExpired, 400));
                        }

                        if (!registration_user.dataValues.is_active) {
                            return reject(self.getErrorApi().sendError(errorTokenUsed, 400));
                        }
                        return ModelRegistrationUser.update({
                            is_active: false
                        }, {
                            where: {
                                token: registration_user.dataValues.token
                            }
                        }).then(function(did_update) {
                            return getApi('login').loginUser(req, registration_user.dataValues.email_address);
                        });
                    } else {
                        return reject(self.getErrorApi().sendError(errorNumberNotFound, 400));
                    }
                })
                .then(function(employee) {
                    eo.employee = employee.dataValues;
                    return resolve(employee.dataValues);
                }).catch(function(error) {
                    return reject(error);
                });
        });
    }
}

module.exports = registationApi;
