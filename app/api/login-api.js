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
                        req.session.user = {
                            employee_id: employee.id,
                            username: employee.username,
                            first_name: employee.first_name,
                            last_name: employee.last_name,
                            email_address: employee.email_address,
                            permissions: ['restricted:employee']
                        }

                        if (employee.is_admin) {
                            req.session.user['permissions'] = ['restricted:admin'];
                        }
                        
                        employee.password = '****';
                        res.json({
                            user: employee,
                            success: true
                        });
                    } else if(!employee) {
                        self.getErrorApi().sendError(1002, 401, res);
                    } else{
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
