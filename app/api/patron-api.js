"use strict";
/*  Title: Patron-api
    Author:  Hubbert
    Date: Sep 28 2016
    Comment: 
        This is the api which is used for all patron search and create logic.
*/
var _removeUneededAttr = function(patron) {
    return {
        email_address: patron.email_address,
        first_name: patron.first_name,
        id: patron.id,
        is_active: patron.is_active,
        last_name: patron.last_name,
        organization_id: patron.organization_id,
        username: patron.username,
        dob: patron,
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

function PatronApi() {
    this.tag = 'patron-api';
    var Promise = getPromise();
    var ModelPatron = models.patron_player;
    var ModelEmployee = models.employee_user;

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
        var self = this;
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
                    organization_id: organization.id
                }
            }).then(function(results) {
                if (results) {
                    patrons.push(_removeUneededAttr(results.dataValues));
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
        
        ModelPatron.findAll({
            where: whereSerach,
            limit: searchLimt
        }).then(function(results) {
            if (results) {
                for (var x in results) {
                    patrons.push(_removeUneededAttr(results[x].dataValues));
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
        var self = this;
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
