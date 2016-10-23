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

var _clean = function(patron) {
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

var _removeUneededAttr = function(employee) {
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

    this.resetPassword = function(req, res) {
        var self = this;
        var user = self.getUser(req, res);
        var organization = self.getOrganization(req, res);

        if (!req.body.email_address) {
            this.getErrorApi().sendError(1010, 400, res);
            return;
        } else if (this.validEmail(req.body.email_address)) {
            this.getErrorApi().sendError(1005, 403, res);
            return;
        }

        ModelPatron.find({
            where: {
                email_address: req.body.email_address,
                is_active: true
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
                    email_address: req.body.email_address,
                    is_active: true
                }
            });
        }).then(function(results) {
            if (results) {
                var employee = results.dataValues;
                
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
