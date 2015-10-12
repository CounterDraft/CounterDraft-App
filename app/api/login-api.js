"use strict";

function loginApi() {
    this.tag = 'login-api';
    this.login = function(req, res) {

        // TODO 
        // Call userResposistoty and get a user;
        // login the user in and save the login session in the database 
        // maybe call a sessionRespository to do this saving


        //TODO: tmp code so I can work on login
        req.session.user = {
            username: "root",
            permissions: ['session:*']
        };
        if (req.session.user) {
            //TODO: need to makes a message.resourse file so we can keep all the strings in it.

            // res.status(200).json({
            //     user: req.session.user,
            //     success: true
            // });

            var errorApi = this.getErrorApi();
            errorApi.sendError(1001, 403, res);

        } else {
            res.status(400).json({
                errors: {
                    name: 'failed-login',
                    message: 'Invalid username/password'
                },
                success: false
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
