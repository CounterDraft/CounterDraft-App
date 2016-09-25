"use strict";
var _sendRegistrationEmail = function(user_email, errorMsg, errorNumber) {
    var ModelRegistrationUser = models.registration_user;
    var currentTime = new Date();

    require('crypto').randomBytes(48, function(err, buffer) {
        var genToken = buffer.toString('hex');
        // add a week for vaildation of token;
        var vUntil = currentTime.setDate(currentTime.getDate() + 14);

        ModelRegistrationUser.create({
            email_address: user_email,
            token: genToken,
            valid_until: vUntil
        }).then(function(registration_user) {
            if (typeof 'undefined' != registration_user) {
                //TODO: send email to user. 
                logger.info('Sending email to user');
            } else {
                logger.error(errorMsg, {
                    error: {
                        email_address: user_email,
                        error: errorNumber
                    }
                });
            }
        });
    });
}

var _validEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
}

function registationApi() {
    var self = this;
    this.tag = 'registation-api';
    this.registerUser = function(req, res) {
        var ModelEmployee = models.employee_user;
        var ModelOrganization = models.organization;

        if (!req.body.first_name || req.body.first_name === "") {
            this.getErrorApi().sendError(1003, 403, res);
        } else if (!req.body.last_name || req.body.last_name === "") {
            this.getErrorApi().sendError(1004, 403, res);
        } else if (!req.body.email_address || _validEmail(req.body.email_address)) {
            this.getErrorApi().sendError(1005, 403, res);
        } else if (!req.body.password || req.body.password === "") {
            this.getErrorApi().sendError(1006, 403, res);
        } else if (!req.body.password_confirm || req.body.password_confirm === "") {
            this.getErrorApi().sendError(1007, 403, res);
        } else if (req.body.password_confirm != req.body.password) {
            this.getErrorApi().sendError(1014, 403, res);
        } else if (!req.body.organization_name || req.body.organization_name === "" && !req.body.organization_type && !req.body.organization_hash || req.body.organization_hash === "") {
            this.getErrorApi().sendError(1015, 403, res);
        } else if (!req.body.organization_hash && !req.body.organization_type && req.body.organization_name) {
            this.getErrorApi().sendError(1016, 403, res);
        } else if (!req.body.organization_hash && req.body.organization_type && !req.body.organization_name || req.body.organization_name === "") {
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
                type: req.body.organization_type
            }).then(function(organization) {
                if (organization.dataValues.id) {
                    employeeOrganization = organization.dataValues.id;
                }
                return ModelEmployee.findAndCountAll({
                    where: {
                        email_address: req.body.email_address
                    }
                });
            }).then(function(result) {
                if (result.count > 0) {
                    self.getErrorApi().sendError(1018, 403, res);
                    return;
                }
                ModelEmployee.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.email_address,
                    email_address: req.body.email_address,
                    password: passwordWithHash,
                    is_admin: false,
                    employee_organization: employeeOrganization
                }).then(function(employee) {
                    if (typeof 'undefined' != employee && employee.$options['isNewRecord']) {
                        var emailErrorNumber = 9901
                        _sendRegistrationEmail(employee.dataValues.email_address, self.getErrorApi().getErrorMsg(emailErrorNumber), emailErrorNumber);

                        var dataSave = {
                            first_name: employee.dataValues.first_name,
                            last_name: employee.dataValues.last_name,
                            username: employee.dataValues.email_address,
                            email_address: employee.dataValues.email_address,
                            employee_organization: employee.dataValues.employee_organization,
                            permissions: ['restricted:employee']
                        }

                        if (employee.dataValues.is_admin) {
                            dataSave['permissions'] = ['restricted:admin']
                        }

                        req.session.user = dataSave;

                        res.status(200).json({
                            user: dataSave,
                            success: true
                        });
                    } else {
                        self.getErrorApi().sendError(1008, 422, res);
                    }
                });
            });
        }
    }

    this.getUserRegistration = function(req, res) {

    }

}

module.exports = registationApi;
