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

var _cleanPatron = function(patron) {
    var moment = getMoment();
    return {
        email_address: patron.email_address,
        first_name: patron.first_name,
        id: patron.id,
        is_active: patron.is_active,
        last_name: patron.last_name,
        organization_id: patron.organization_id,
        username: patron.username,
        dob: moment(patron.dob).unix(),
        address: {
            street_number: patron.street_number,
            route: patron.route,
            locality: patron.locality,
            administrative_area_level_1: patron.administrative_area_level_1,
            administrative_area_level_2: patron.administrative_area_level_2,
            country: patron.country,
            postal_code: patron.postal_code
        },
        uuid: patron.p_uuid
    }
}

var _cleanEmployee = function(employee) {
    var moment = getMoment();
    return {
        email_address: employee.email_address,
        first_name: employee.first_name,
        id: employee.id,
        is_active: employee.is_active,
        last_name: employee.last_name,
        organization_id: employee.organization_id,
        username: employee.username,
        uuid: employee.e_uuid,
        createdAt: moment(employee.createdAt).unix(),
        updatedAt: moment(employee.updatedAt).unix()
    }
}

function ResetApi() {
    this.tag = 'reset-api';
    var Promise = getPromise();
    var ModelEmployee = models.employee_user;
    var ModelPatron = models.patron_player;
    var moment = getMoment();

    this.resetPassword = function(req, res) {
        var self = this;
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
                email_address: req.body.email_address,
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
                    email_address: req.body.email_address,
                    is_active: true
                }
            });
        }).then(function(results) {
            if (results.dataValues) {
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
                    getApi('email').resetPassword(empOut.email_address, token);
                    res.status(200).json({
                        user: _cleanPatron(empOut),
                        success: true
                    });
                } else if (patronOut) {
                    getApi('email').resetPassword(patronOut.email_address, token);
                    res.status(200).json({
                        user: _cleanPatron(patronOut),
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
