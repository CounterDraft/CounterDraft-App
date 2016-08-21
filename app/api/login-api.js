"use strict";

function loginApi() {
    this.tag = 'login-api';
    this.login = function(req, res) {
        var employee_user_model = models.employee_user;
        if (!req.body.username) {
            this.getErrorApi().sendError(1001, 403, res);
        } else if (!req.body.password) {
            this.getErrorApi().sendError(1001, 403, res);
        } else {
            req.session.user = {
                username: req.body.username,
                permissions: 'user'
            }
            res.status(200).json({
                user: req.session.user,
                success: true
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

module.exports = loginApi;
