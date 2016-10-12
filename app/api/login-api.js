"use strict";

function LoginApi() {
    this.tag = 'login-api';
    var Promise = getPromise();
    var Employee = models.employee_user;

    this.loginUser = function(req, email_address) {
        var self = this;
        return new Promise(function(resolve, reject) {
            Employee.findOne({
                where: {
                    email_address: email_address
                }
            }).then(function(employee) {
                if (employee) {
                    req.session.user = {
                        employee_id: employee.id,
                        username: employee.username,
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        email_address: employee.email_address,
                        permissions: ['restricted:employee']
                    }
                    if (employee.is_admin) {
                        req.session.user['permissions'] = ['restricted:admin,employee'];
                    }
                    return resolve(employee);
                } else {
                    return resolve(self.getErrorApi().sendError(9903, 404));
                }
            });
        });
    }

    this.login = function(req, res) {
        var self = this;

        if (!req.body.email_address) {
            this.getErrorApi().sendError(1001, 403, res);
        } else if (!req.body.password) {
            this.getErrorApi().sendError(1001, 403, res);
        } else {
            // search for attributes
            Employee.findOne({
                    where: {
                        email_address: req.body.email_address
                    }
                })
                .then(function(employee) {
                    var hash = getHash();

                    //this code may not be needed.
                    if (employee && employee.password && !hash.isHashed(employee.password)) {
                        employee.password = hash.generate(employee.password);
                    }

                    if (employee && hash.verify(req.body.password, employee.password)) {
                        req.session.user = {
                            employee_id: employee.id,
                            username: employee.username,
                            first_name: employee.first_name,
                            last_name: employee.last_name,
                            email_address: employee.email_address,
                            permissions: ['restricted:employee']
                        }

                        if (employee.is_admin) {
                            req.session.user['permissions'] = ['restricted:admin,employee'];
                        }

                        employee.password = '****';
                        res.json({
                            user: employee,
                            success: true
                        });
                    } else if (!employee) {
                        self.getErrorApi().sendError(1002, 401, res);
                    } else {
                        self.getErrorApi().sendError(1001, 401, res);
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
