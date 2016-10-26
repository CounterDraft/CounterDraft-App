"use strict";
/*  Title: Patron-api
    Author:  Hubbert
    Date: Sep 28 2016
    Comment: 
        This is the api which is used for all patron search and create logic.
*/
function PatronApi() {
    var self = this;
    this.tag = 'patron-api';
    var Promise = getPromise();
    var ModelPatron = models.patron_player;
    var ModelEmployee = models.employee_user;


    this.retrieve = function(patron_id) {
        return ModelPatron.findOne({
            where: {
                id: patron_id,
                is_active: true
            }
        });
    }

    this.update = function(req, res) {
        var moment = getMoment();
        var user = self.getUser(req, res);
        var organizaion = self.getOrganization(req, res);
        var patronIn = req.body;
        var chckData = this._verifyInformation(patronIn);
        var patronOut = null;
        var minAge = 18;

        if (!patronIn.hasOwnProperty('id')) {
            self.getErrorApi().sendError(1049, 422, res);
            return;
        }
        if (chckData.isCorrupt) {
            self.getErrorApi().sendError(chckData.errNum, 422, res);
            return;
        }
        if (patronIn.hasOwnProperty('dob')) {
            var eightYearsAgo = moment().subtract("years", minAge);
            var birthday = moment(patronIn.dob);
            if (!eightYearsAgo.isAfter(birthday)) {
                self.getErrorApi().sendError(1047, 422, res);
                return;
            }
        }

        ModelPatron.findOne({
            where: {
                id: patronIn.id,
                organization_id: organizaion.id,
                is_active: true
            }
        }).then(function(result) {
            if (result) {
                var fPatron = result.dataValues;
                var updateData = {};
                var userData = patronIn || null;

                if (userData) {
                    for (var x in userData) {
                        if (fPatron.hasOwnProperty(x) && fPatron[x] !== userData[x]) {
                            updateData[x] = userData[x];
                        }
                    }
                } else {
                    return new Promise(function(resolve, reject) {
                        reject({ errNum: 1012, status: 422 });
                    });
                }
                patronOut = mix(fPatron).into(updateData);
                return ModelPatron.update(updateData, {
                    where: {
                        id: fPatron.id,
                        organization_id: organizaion.id,
                        is_active: true
                    }
                });
            } else {
                return new Promise(function(resolve, reject) {
                    reject({ errNum: 1041, status: 422 });
                });
            }
        }).then(function(result) {
            if (result) {
                res.status(200).json({
                    patron: self._cleanPatron(patronOut),
                    success: true
                });
            } else {
                self.getErrorApi().setErrorWithMessage(1048, 500, res);
            }
        }).catch(function(err) {
            if (err.errNum) {
                self.getErrorApi().sendError(err.errNum, err.status, res);
            } else {
                self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
            }
        });
    }

    this.getPatron = function(req, res) {
        var query = req.query;
        var user = self.getUser(req, res);
        var organization = self.getOrganization(req, res);

        if (!query.hasOwnProperty('id')) {
            self.getErrorApi().sendError(1031, 422, res);
            return;
        }
        ModelPatron.findOne({
            where: {
                id: query.id,
                organization_id: organization.id,
                is_active: true
            }
        }).then(function(result) {
            if (result) {
                var patron = result.dataValues;
                res.status(200).json({
                    patron: self._cleanPatron(patron),
                    success: true
                });
            } else {
                self.getErrorApi().sendError(1041, 422, res);
            }
        }).catch(function(err) {
            self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
        });
    }

    this.getImage = function(req, res) {
        res.status(200).json({
            success: true
        });
    }

    this.postImage = function(req, res) {
        res.status(200).json({
            success: true
        });
    }

    this.updateImage = function(req, res) {
        res.status(200).json({
            success: true
        });
    }

    this.userChangePassword = function(req, res) {
        var params = req.body;
        console.log(params)
        res.status(200).json({
            patron: params,
            success: true
        });
    }

    this.find = function(req, res) {

        var user = self.getUser(req, res);
        var organization = self.getOrganization(req, res);
        var serachParams = [
            'email_address',
            'first_name',
            'last_name',
            'patron_id'
        ];
        var searchObject = {};
        var patrons = [];
        var whereSerach = {};
        var searchLimt = 50;

        if (Object.keys(req.query).length === 0) {
            res.status(200).json({
                patrons: patrons,
                success: true
            });
        }
        for (var x in req.query) {
            if (serachParams.indexOf(x) > -1 && req.query[x] != '' && req.query[x] != null) {
                searchObject[x] = req.query[x];
            }
        }
        // if we have patron_id we dont search the other stuff;
        if (searchObject.hasOwnProperty('patron_id')) {
            ModelPatron.find({
                where: {
                    id: searchObject.patron_id,
                    organization_id: organization.id,
                    is_active: true
                }
            }).then(function(results) {
                if (results) {
                    patrons.push(self._cleanPatron(results.dataValues));
                }
                res.status(200).json({
                    patrons: patrons,
                    success: true
                });
            }).catch(function(err) {
                self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
            });
            return;
        }

        //add where search for pg only;
        for (var x in searchObject) {
            whereSerach[x] = {
                $iLike: '%' + searchObject[x] + '%'
            }
        }
        whereSerach.organization_id = organization.id;
        whereSerach.is_active = true;

        ModelPatron.findAll({
            where: whereSerach,
            limit: searchLimt
        }).then(function(results) {
            if (results) {
                for (var x in results) {
                    patrons.push(self._cleanPatron(results[x].dataValues));
                }
            }
            res.status(200).json({
                patrons: patrons,
                success: true
            });
        }).catch(function(err) {
            self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
        });
    }

    this.getTotalPatron = function(req, res) {

        var organization = self.getOrganization(req, res);

        ModelPatron.findAndCountAll({
            where: {
                organization_id: organization.id,
                is_active: true
            }
        }).then(function(results) {
            res.status(200).json({
                total: results.count,
                success: true
            });
        }).catch(function(err) {
            self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
        });
    }

    this._verifyInformation = function(patron) {
        var moment = getMoment();
        var errorNumber = null;
        if (patron.hasOwnProperty('first_name') &&
            !this.getModelPattern('first_name').test(patron.first_name)) {
            errorNumber = 1035;
        }
        if (patron.hasOwnProperty('last_name') &&
            !this.getModelPattern('last_name').test(patron.first_name)) {
            errorNumber = 1036;
        }
        if (patron.hasOwnProperty('username') &&
            this.validEmail(patron.username)) {
            errorNumber = 1037;
        }
        if (patron.hasOwnProperty('email_address') &&
            this.validEmail(patron.email_address)) {
            errorNumber = 1038;
        }
        if (patron.hasOwnProperty('phone') &&
            patron.phone &&
            !this.getModelPattern('phone').test(patron.phone)) {
            errorNumber = 1046;
        }
        if (patron.hasOwnProperty('dob') &&
            !moment(patron.dob, moment.ISO_8601).isValid()) {
            errorNumber = 1046;
        }
        if (patron.hasOwnProperty('password')) {
            errorNumber = 1034;
        }
        if (patron.hasOwnProperty('organization_id')) {
            errorNumber = 1034;
        }
        if (patron.hasOwnProperty('p_uuid')) {
            errorNumber = 1034;
        }
        if (patron.hasOwnProperty('createdAt')) {
            errorNumber = 1034;
        }
        if (patron.hasOwnProperty('updatedAt')) {
            errorNumber = 1034;
        }


        var isCorrupt = false;
        if (errorNumber) {
            isCorrupt = true;
        }
        return {
            errNum: errorNumber,
            isCorrupt: isCorrupt
        };
    }
}

module.exports = PatronApi;
