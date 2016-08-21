"use strict";

function registationApi() {
    this.tag = 'registation-api';
    this.registerUser = function(req, res) {
        var employee_user_model = models.employee_user;
        if (!req.body.first_name) {
            this.getErrorApi().sendError(1003, 403, res);
        } else if (!req.body.last_name) {
            this.getErrorApi().sendError(1004, 403, res);
        } else if (!req.body.email_address) {
            this.getErrorApi().sendError(1005, 403, res);
        } else if (!req.body.password) {
            this.getErrorApi().sendError(1006, 403, res);
        } else if (!req.body.password_confirm) {
            this.getErrorApi().sendError(1007, 403, res);
        } else {
            employee_user_model.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.email_address,
                email_address: req.body.email_address,
                password: req.body.password,
                is_admin: false,
                employee_organization: 1,
            }).spread(function(user, created) {
                if (created) {
                    req.session.user = {
                        username: req.body.email_address,
                        permissions: 'user'
                    }
                    var jsonO = user.get({ plain: true });
                    jsonO.success = true;
                    res.status(200).json(jsonO);
                }
                this.getErrorApi().sendError(1008, 422, res);
            });
        }
    }
    this.getUserRegistration = function(req, res) {

    }
}

module.exports = registationApi;
