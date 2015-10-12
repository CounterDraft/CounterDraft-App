"use strict";

function registationApi() {
    this.tag = 'registation-api';
    this.registerUser = function(req, res) {
        return new Promise(function(resolve, reject) {
            var validator = GLOBAL.getValidator();
            if (validator.isEmail(req.body.email)) {
                reject({
                    code: 3,
                    message: 'Invalid email.'
                });
                return;
            } else if (validator.isPassword(req.body.password)) {
                reject({
                    code: 3,
                    message: 'Invalid password.'
                });
                return;
            }

            var input = {
                email: req.body.email,
                password: req.body.password
            };

            input.salt = GLOBAL.generateUUID();
            input.verificationCode = GLOBAL.generateUUID();
            input.password = GLOBAL.generatePasswordHash(input.password, input.salt);

            var accountModel = GLOBAL.getModel('AccountModel');
            accountModel.register(input).then(
                function(data) {
                    this.sendVerificationController(input).then(
                        function(data) {
                            resolve(data);
                        },
                        function(err) {
                            reject(err);
                        }
                    );
                },
                function(err) {
                    reject(err);
                }
            );
        });
    }
    
    this.getUserRegistration = function(req, res) {

    }
}

module.exports = registationApi;
