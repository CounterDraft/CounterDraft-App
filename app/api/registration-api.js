"use strict";
var _sendRegistrationEmail = function(user_email) {
    console.log(user_email);
}

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
            //testing
            res.status(200).json({
                user: req.body,
                success: true
            });

            employee_user_model.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.email_address,
                email_address: req.body.email_address,
                password: req.body.password,
                is_admin: false,
                employee_organization: 1,
            }).then(function(data) {
                if (typeof 'undefined' != data && data.$options['isNewRecord']) {
                    // _sendRegistrationEmail(data.dataValues.email_address);
                    req.session.user = {
                        username: data.dataValues.username,
                        permissions: 'user'
                    }
                    data.dataValues.password = '****';
                    // res.status(200).json({
                    //     user: data.dataValues,
                    //     success: true
                    // });
                } else {
                    this.getErrorApi().sendError(1008, 422, res);
                }
            });
        }
    }
    this.getUserRegistration = function(req, res) {

    }

}

module.exports = registationApi;
