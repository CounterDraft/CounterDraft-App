"use strict";
/*  Title: Reset-api
    Author:  Hubbert
    Date: Oct 11 2016
    Comment: 
        This is the api which is used for all reseting stuff all logic should be here.
*/
var _sendResetEmail = function(user_email) {
    //generate a token for reseting password;
    //send email to email address.
}

function ResetApi() {
    this.tag = 'reset-api';
    var Promise = getPromise();
    var ModelEmployee = models.employee_user;
    var ModelPatron = models.patron_player;

    this.resetUsernamePassword = function(req, res) {
        var self = this;
        if (!req.body.email_address) {
            this.getErrorApi().sendError(1010, 400, res);
            return;
        } else if (this.validEmail(req.body.email_address)) {
            this.getErrorApi().sendError(1005, 403, res);
            return;
        }

        ModelPatron.find({
            where: {
                email_address: req.body.email_address
            }
        }).then(function(results) {
            if (results) {
                var patron = results.dataValues;
                var saveData = {
                    first_name: patron.first_name,
                    last_name: patron.last_name,
                    email_address: patron.email_address
                }
                _sendResetEmail(patron.email_address);

                res.status(200).json({
                    user: patron,
                    success: true
                });
                return new Promise(function(resolve, reject) {
                    return resolve(true);
                });
            }
            return ModelEmployee.find({
                where: {
                    email_address: req.body.email_address
                }
            });
        }).then(function(results) {
            if (results) {
                var employee = results.dataValues;
                var saveData = {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    email_address: employee.email_address
                };
                _sendResetEmail(employee.email_address);
                res.status(200).json({
                    user: saveData,
                    success: true
                });
            } else {
                self.getErrorApi().sendError(1002, 401, res);
            }
        });
    }
}

module.exports = ResetApi;
