"use strict";
/*  Title: Patron-api
    Author:  Hubbert
    Date: Sep 28 2016
    Comment: 
        This is the api which is used for all patron search and create logic.
*/

function PatronApi() {
    this.tag = 'patron-api';
    var Promise = getPromise();
    var ModelPatron = models.patron_player;

    this.getPatron = function(req, res) {
        var self = this;
        console.log(req.query);
        new Promise(function(resolve, reject) {
            return resolve(true);

        }).then(function(result) {
            res.status(200).json({
                success: true
            });
        });
    }
    this.create = function(req, res) {
        var self = this;
        var user = req.session.user;

        if (!req.body.first_name || req.body.first_name === "") {
            this.getErrorApi().sendError(1003, 403, res);
        } else if (!req.body.last_name || req.body.last_name === "") {
            this.getErrorApi().sendError(1004, 403, res);
        } else if (!req.body.email_address || self.validEmail(req.body.email_address)) {
            this.getErrorApi().sendError(1005, 403, res);
        } else if (!req.body.password || req.body.password === "") {
            this.getErrorApi().sendError(1006, 403, res);
        } else if (!req.body.password_confirm || req.body.password_confirm === "") {
            this.getErrorApi().sendError(1007, 403, res);
        } else if (req.body.password_confirm != req.body.password) {
            this.getErrorApi().sendError(1014, 403, res);
        }
        // else if (!req.body.organization || req.body.organization === "") {
        //     this.getErrorApi().sendError(1015, 403, res);
        // } 
        else {
            var passwordWithHash = getHash().generate(req.body.password);
            if (!passwordWithHash) {
                this.getErrorApi().sendError(1013, 422, res);
                return;
            }
            ModelPatron.findAndCountAll({
                where: {
                    email_address: req.body.email_address
                }
            }).then(function(results) {
                if (results.count > 0) {
                    return new Promise(function(resolve, reject) {
                        return reject(self.getErrorApi().getErrorMsg(1018));
                    });
                }
                return getApi('employee').retrieve(user.employee_id);
            }).then(function(results) {
                var employee = results.dataValues;
                return ModelPatron.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.email_address,
                    email_address: req.body.email_address,
                    password: passwordWithHash,
                    patron_organization: employee.employee_organization
                });
            }).then(function(results) {
                var patron = results.dataValues;
                var dataSave = {
                    first_name: patron.first_name,
                    last_name: patron.last_name,
                    username: patron.username,
                    email_address: patron.email_address,
                    patron_organization: patron.patron_organization
                }
                res.status(200).json({
                    user: dataSave,
                    success: true
                });
            }).catch(function(err) {
                self.getErrorApi().setErrorWithMessage(err.toString(), 422, res);
            });
        }
    }
}

module.exports = PatronApi;
