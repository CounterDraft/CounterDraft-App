"use strict";
/*  Title: Organization-Api
    Author:  Hubbert
    Date: Oct 07 2016
    Comment: 
        This is the api which is used for all organization calls / managment.
*/

function OrganizationApi() {
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
