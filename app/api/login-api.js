"use strict";

function loginApi() {
    this.tag = 'login-api';
    this.login = function(req, res) {
        if (req.body.username === 'admin@counterdraft.com') {
            req.session.user = {
                username: req.body.username,
                permissions: 'govermnet'
            }
            //TODO: need to makes a message.resourse file so we can keep all the strings in it.
            res.status(200).json({
                user: req.session.user,
                success: true
            });
        }else{
            this.getErrorApi().sendError(1001, 403, res);
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
