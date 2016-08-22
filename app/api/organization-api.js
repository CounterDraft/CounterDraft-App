"use strict";

function OrganizationApi() {
    this.tag = 'organization-api';

    this.getOrganizationTypes = function(req, res) {
        var Organization_types = model.organization_types;
        Organization_types.all().then(function(organization_types) {
            if (organization_types) {
                res.status(200).json({
                    organization_types: organization_types,
                    success: true
                });
            }else{
                this.getErrorApi().sendError(1009, 500, res);
            }

        });
    }
}

module.exports = OrganizationApi;
