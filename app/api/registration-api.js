"use strict";
var _sendRegistrationEmail = function(user_email) {
    console.log(user_email);
}

var _validEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
}

function registationApi() {
    var self = this;
    this.tag = 'registation-api';
    this.registerUser = function(req, res) {
        var Model = models.employee_user;
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
            if (!passwordWithHash) {
                this.getErrorApi().sendError(1013, 422, res);
                return;
            }
            //create the organization;

            Model.findAndCountAll({
                where: {
                    email_address: req.body.email_address
                }
            }).then(function(result) {
                if (result.count > 0) {
                    self.getErrorApi().sendError(1018, 403, res);
                    return;
                }
                Model.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.email_address,
                    email_address: req.body.email_address,
                    password: passwordWithHash,
                    is_admin: false,
                    employee_organization: 999,
                }).then(function(data) {
                    if (typeof 'undefined' != data && data.$options['isNewRecord']) {
                        // _sendRegistrationEmail(data.dataValues.email_address);

                        var dataSave = {
                            first_name: data.dataValues.first_name,
                            last_name: data.dataValues.last_name,
                            username: data.dataValues.email_address,
                            email_address: data.dataValues.email_address,
                            employee_organization: data.dataValues.employee_organization,
                            permissions: ['restricted:employee']
                        }

                        if (data.dataValues.is_admin) {
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
