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
}

module.exports = EmployeeApi;
