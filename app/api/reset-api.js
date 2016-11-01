"use strict";
/*  Title: Reset-api
    Author:  Hubbert
    Date: Oct 11 2016
    Comment: 
        This is the api which is used for all reseting stuff all logic should be here.
*/
var _generateToken = function() {
    var uuid = generateUUID().replace(/-/g, "");
    if (uuid) {
        return uuid;
    }
}

function ResetApi() {
    var self = this;
    this.tag = 'reset-api';
    var Promise = getPromise();
    var ModelEmployee = models.employee_user;
    var ModelPatron = models.patron_player;
    var moment = getMoment();

    this.changePassword = function(req, res) {
        var user = self.getUser(req, res);
        var organization = self.getOrganization(req, res);
        var resetModel = req.body;

        //verify key;
        //call api to change password;
        //log patron or emp in to the system.

        res.status(200).json({
            success: true
        });
    }

    this.checkPasswordResetToken = function(token, email_address) {
        var self = this;
        var hash = getHash();

        return new Promise(function(resolv, rejec) {
            if (!token || !email_address) {
                rejec(1051);
                return;
            }
            ModelEmployee.findOne({
                where: {
                    email_address: { $iLike: email_address },
                    is_active: true
                }
            }).then(function(result) {
                if (result) {
                    return new Promise(function(resolve, reject) {
                        resolve(result);
                    });
                } else {
                    return ModelPatron.findOne({
                        where: {
                            email_address: { $iLike: email_address },
                            is_active: true
                        }
                    });
                }
            }).then(function(result) {
                if (result) {
                    var user = result.dataValues;
                    console.log(moment(user.retrieve_expiration).format());
                    console.log(moment().format());
                    if (hash.verify(token, user.retrieve_token) && moment().isBefore(moment(user.retrieve_expiration))) {
                        resolv(result);
                    } else {
                        rejec(1051);
                    }
                } else {
                    rejec(9905);
                }
            }).catch(function(err) {
                rejec(err);
            });
        });
    }

    this.resetPassword = function(req, res) {

        var user = self.getUser(req, res);
        var organization = self.getOrganization(req, res);
        var token = _generateToken();
        var tokenHash = getHash().generate(token);
        //TODO: allow this to be configured by orgnaization settings.
        var eTime = moment().add('m', 45);
        var empOut = null;
        var patronOut = null;

        if (!req.body.email_address) {
            this.getErrorApi().sendError(1010, 400, res);
            return;
        } else if (this.validEmail(req.body.email_address)) {
            this.getErrorApi().sendError(1005, 403, res);
            return;
        }
        var updates = {
            retrieve_token: tokenHash,
            retrieve_expiration: eTime.format()
        }
        ModelPatron.find({
            where: {
                email_address: { $iLike: req.body.email_address },
                is_active: true
            }
        }).then(function(results) {
            if (results) {
                patronOut = results.dataValues;
                return ModelPatron.update(
                    updates, {
                        where: {
                            id: patronOut.id
                        }
                    });
            }
            return ModelEmployee.find({
                where: {
                    email_address: { $iLike: req.body.email_address },
                    is_active: true
                }
            });
        }).then(function(results) {
            if (results && results.hasOwnProperty('dataValues')) {
                empOut = results.dataValues;
                return ModelEmployee.update(
                    updates, {
                        where: {
                            id: empOut.id
                        }
                    });
            } else if (results) {
                return new Promise(function(resolve, reject) {
                    return resolve(results);
                });
            } else {
                return new Promise(function(resolve, reject) {
                    reject({ errNum: 1002, status: 401 });
                });
            }
        }).then(function(results) {
            if (results) {
                if (empOut) {
                    getApi('email').resetPassword(empOut, token);
                    res.status(200).json({
                        user: self._cleanPatron(empOut),
                        success: true
                    });
                } else if (patronOut) {
                    getApi('email').resetPassword(patronOut, token);
                    res.status(200).json({
                        user: self._cleanPatron(patronOut),
                        success: true
                    });
                } else {
                    return new Promise(function(resolve, reject) {
                        reject({ errNum: 1002, status: 401 });
                    });
                }
            } else {
                return new Promise(function(resolve, reject) {
                    reject({ errNum: 1002, status: 401 });
                });
            }
        }).catch(function(err) {
            if (err.errNum) {
                self.getErrorApi().sendError(err.errNum, err.status, res);
            } else {
                self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
            }
        });
    }
}

module.exports = ResetApi;
