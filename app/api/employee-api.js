"use strict";
/*  Title: Employee-Api
    Author:  Hubbert
    Date: Oct 07 2016
    Comment: 
        This is the api which is used for all employee calls / managment.
*/

var _removeUneededAttr = function(employee) {
    return {
        email_address: employee.email_address,
        first_name: employee.first_name,
        id: employee.id,
        is_active: employee.is_active,
        last_name: employee.last_name,
        organization_id: employee.organization_id,
        username: employee.username,
        uuid: employee.e_uuid,
        createdAt: getUnixTimeStamp(employee.createdAt),
        updatedAt: getUnixTimeStamp(employee.updatedAt)
    }
}

function EmployeeApi() {
    this.tag = 'employee-api';
    var Promise = getPromise();
    var ModelEmployee = models.employee_user;

    this.retrieve = function(employee_id) {
        var self = this;
        return ModelEmployee.findOne({
            where: {
                id: employee_id
            }
        });
    }

    this.getEmployee = function(req, res) {
        var self = this;
        var user = self.getUser(req, res);
        var organization = self.getOrganization(req, res);
        var employee_id = req.query.id || null;
        if (!employee_id) {
            this.getErrorApi().sendError(1031, 400, res);
            return;
        }
        this.retrieve(employee_id)
            .then(function(result) {
                if (result) {
                    var employee = result.dataValues;
                    res.status(200).json({
                        employee: _removeUneededAttr(employee),
                        organization: organization,
                        success: true
                    });
                } else {
                    this.getErrorApi().sendError(1032, 404, res);
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

module.exports = EmployeeApi;
