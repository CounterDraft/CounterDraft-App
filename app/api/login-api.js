"use strict";

function LoginApi() {
    this.tag = 'login-api';
    this.login = function(req, res) {
        var self = this;
        var Employee = models.employee_user;
        if (!req.body.username) {
            this.getErrorApi().sendError(1001, 403, res);
        } else if (!req.body.password) {
            this.getErrorApi().sendError(1001, 403, res);
        } else {
            // search for attributes
            Employee.findOne({
                    where: {
                        username: req.body.username
                    }
                })
                .then(function(employee) {
                    if (employee && employee.password === req.body.password) {
                        var permission = 'user';
                        if (employee.is_admin) {
                            permission = 'admin';
                        }
                        req.session.user = {
                            employee_id: employee.id,
                            username: employee.username,
                            permissions: permission,
                            first_name: employee.first_name,
                            last_name: employee.last_name,
                            email_address: employee.email_address
                        }
                        var employee_out = employee;
                        employee_out.password = '****';
                        res.json({
                            user: employee_out,
                            success: true
                        });
                    } else {
                        //user not found.
                        self.getErrorApi().sendError(1002, 401, res);
                    }
                });
        }
    }

    this.getLogin = function(req, res) {
        if (req.session.user) {
            res.status = 200;
            res.json({
                user: req.session.user,
                message: 'completed'
            });
        } else {
            res.status = 400;
            res.json({
                message: 'User not logged in.'
            });
        }

    }
}

module.exports = LoginApi;
