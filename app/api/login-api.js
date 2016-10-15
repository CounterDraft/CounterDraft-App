"use strict";

function LoginApi() {
    this.tag = 'login-api';
    var Promise = getPromise();
    var Employee = models.employee_user;
    var Organization = models.organization;

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
                    return Organization.findOne({
                        where: {
                            id: employee.employee_organization
                        }
                    });
                } else {
                    return new Promise(function(resolve, reject) {
                        reject(9903, 404);
                    });
                }
            }).then(function(organization) {
                if (organization) {
                    req.session.organization = organization;
                    resolve(req.session);
                } else {
                    reject(self.getErrorApi().getErrorMsg(1028));
                }
            }).catch(function(err, status) {
                if (typeof err === "number") {
                    reject(self.getErrorApi().getErrorMsg(err));
                } else {
                    reject(err);
                }
            });
        });
    }

    this.login = function(req, res) {
        var self = this;
        var fEmployee = null;

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
            }).then(function(employee) {
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

                    fEmployee = {
                        employee_id: employee.id,
                        username: employee.username,
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        email_address: employee.email_address,
                        is_admin: employee.is_admin
                    }

                    return Organization.findOne({
                        where: {
                            id: employee.employee_organization
                        }
                    });

                } else if (!employee) {
                    return new Promise(function(resolve, reject) {
                        reject(1002, 401);
                    });
                } else {
                    return new Promise(function(resolve, reject) {
                        reject(1001, 401);
                    });
                }

            }).then(function(organization) {
                if (organization) {
                    req.session.organization = organization;
                    res.json({
                        user: fEmployee,
                        success: true
                    });
                } else {
                    self.getErrorApi().sendError(1028, 422, res);
                }
            }).catch(function(err, status){
                if (typeof err === "number") {
                    self.getErrorApi().sendError(err, status, res);
                } else {
                    self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
                }
            });
        }
    }

    this.getLogin = function(req, res) {
        if (req.session.user) {
            res.status = 200;
            res.json({
                user: req.session.user,
                success: true
            });
        } else {
            res.status = 400;
            res.json({
                message: 'User not logged in.',
                success: false
            });
        }
    }
}

module.exports = LoginApi;
