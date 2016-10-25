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
    var ModelEmployee = models.employee_user

    this.retrieve = function(patron_id) {
        return ModelPatron.findOne({
            where: {
                id: patron_id,
                is_active: true
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
}

module.exports = PatronApi;
