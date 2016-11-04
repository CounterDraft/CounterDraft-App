"use strict";
/*  Title: Organization-Api
    Author:  Hubbert
    Date: Oct 07 2016
    Comment: 
        This is the api which is used for all organization calls / managment.
*/

function OrganizationApi() {
    var self = this;
    this.tag = 'organization-api';
    var Promise = getPromise();
    var ModelOrganization = models.organization;

    this.getOrganizationTypes = function(req, res) {
        var Organization_types = models.organization_type;
        Organization_types.all().then(function(organization_types) {
            if (organization_types) {
                res.status(200).json({
                    organization_types: organization_types,
                    success: true
                });
            } else {
                this.getErrorApi().sendError(1009, 500, res);
            }
        });
    }
    this.retrieve = function(organization_id) {
        return ModelOrganization.find({
            where: {
                id: organization_id,
                is_active: true
            }
        });
    }
    this.get_organization = function(req, res) {
        var query = req.query;
        var user = self.getUser(req, res);
        var organization = self.getOrganization(req, res);

        ModelOrganization.findOne({
            where: {
                id: organization.id,
                is_active: true
            }
        }).then(function(result) {
            if (result) {
                var organization = result.dataValues;
                res.status(200).json({
                    organization: self._cleanOrganization(organization),
                    success: true
                });
            } else {
                self.getErrorApi().sendError(1030, 422, res);
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
}

module.exports = OrganizationApi;
