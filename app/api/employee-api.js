"use strict";
/*  Title: Employee-Api
    Author:  Hubbert
    Date: Oct 07 2016
    Comment: 
        This is the api which is used for all employee calls / managment.
*/

function EmployeeApi() {
    this.tag = 'employee-api';
    var Promise = getPromise();
    var ModelEmployee = models.employee_user;

    this.retrieve = function(employee_id) {
        return ModelEmployee.find({
            where: {
                id: employee_id
            }
        });
    }
    
    //TODO: what should I return?
    this.getEmployee = function(req, res){
        res.status(200).json({
            success: true
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
