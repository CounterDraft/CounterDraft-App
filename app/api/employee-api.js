"use strict";
/*  Title: Employee-Api
    Author:  Hubbert
    Date: Oct 07 2016
    Comment: 
        This is the api which is used for all employee calls / managment.
*/

function EmployeeApi() {
    var self = this;
    this.tag = 'employee-api';
    var Promise = getPromise();
    var ModelEmployee = models.employee_user;

    this._verifyInformation = function(employee) {
        var errorNumber = null;
        if (employee.hasOwnProperty('id')) {
            errorNumber = 1034;
        }
        if (employee.hasOwnProperty('first_name') &&
            !this.getModelPattern('first_name').test(employee.first_name)) {
            errorNumber = 1035;
        }
        if (employee.hasOwnProperty('last_name') &&
            !this.getModelPattern('last_name').test(employee.first_name)) {
            errorNumber = 1036;
        }
        if (employee.hasOwnProperty('username') &&
            this.validEmail(employee.username)) {
            errorNumber = 1037;
        }
        if (employee.hasOwnProperty('email_address') &&
            this.validEmail(employee.email_address)) {
            errorNumber = 1038;
        }
        if (employee.hasOwnProperty('password')) {
            errorNumber = 1034;
        }
        if (employee.hasOwnProperty('organization_id')) {
            errorNumber = 1034;
        }
        if (employee.hasOwnProperty('e_uuid')) {
            errorNumber = 1034;
        }
        if (employee.hasOwnProperty('createdAt')) {
            errorNumber = 1034;
        }
        if (employee.hasOwnProperty('updatedAt')) {
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

    this.retrieve = function(employee_id) {
      
        return ModelEmployee.findOne({
            where: {
                id: employee_id,
                is_active: true
            }
        });
    }

    this.update = function(req, res) {
      
        var user = self.getUser(req, res);
        var chckData = this._verifyInformation(req.body);
        var empOut = null;
        if (chckData.isCorrupt) {
            this.getErrorApi().sendError(chckData.errNum, 422, res);
            return;
        }
        ModelEmployee.findOne({
            where: {
                id: user.employee_id,
                is_active: true
            }
        }).then(function(result) {
            if (result) {
                var employee = result.dataValues;
                var updateData = {};
                var userData = req.body || null;
                if (userData) {
                    for (var x in userData) {
                        if (employee[x] && employee[x] !== userData[x]) {
                            updateData[x] = userData[x];
                        }
                    }
                    if (updateData.hasOwnProperty('email_address')) {
                        updateData['is_email_confirmed'] = false;
                    }
                } else {
                    return new Promise(function(resolve, reject) {
                        reject({ errNum: 1012, status: 422 });
                    });
                }
                empOut = mix(result.dataValues).into(updateData);
                return ModelEmployee.update(updateData, {
                    where: {
                        id: employee.id,
                        is_active: true
                    }
                });
            } else {
                return new Promise(function(resolve, reject) {
                    reject({ errNum: 1032, status: 500 });
                });
            }
        }).then(function(result) {
            if (result) {
                self._refreshSession(req, empOut);
                res.status(200).json({
                    employee: self._cleanEmployee(empOut),
                    success: true
                });
            } else {
                self.getErrorApi().setErrorWithMessage(1033, 422, res);
            }
        }).catch(function(err) {
            if (err.errNum) {
                self.getErrorApi().sendError(err.errNum, err.status, res);
            } else {
                self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
            }
        });
    }

    this.changePassword = function(req, res) {
        
        //user should be in the system.
        var user = self.getUser(req, res);
        var reqbody = req.body;
        if (!reqbody.new_password || reqbody.new_password === "") {
            this.getErrorApi().sendError(1043, 403, res);
        } else if (!reqbody.old_password || reqbody.old_password === "") {
            this.getErrorApi().sendError(1042, 403, res);
        } else if (!reqbody.password_confirm || reqbody.password_confirm === "") {
            this.getErrorApi().sendError(1007, 403, res);
        } else if (reqbody.password_confirm != reqbody.new_password) {
            this.getErrorApi().sendError(1014, 403, res);
        } else if (!this.getModelPattern('password').test(reqbody.password)) {
            this.getErrorApi().sendError(1039, 422, res);
        } else {
            var hash = getHash();

            ModelEmployee.findOne({
                where: {
                    id: user.employee_id,
                    is_active: true
                }
            }).then(function(result) {
                if (result) {
                    var employee = result.dataValues;
                    //this code may not be needed.
                    if (employee && employee.password && !hash.isHashed(employee.password)) {
                        employee.password = hash.generate(employee.password);
                    }

                    if (employee && employee.password && !hash.verify(reqbody.old_password, employee.password)) {
                        return new Promise(function(resolve, reject) {
                            reject({ errNum: 1045, status: 422 });
                        });
                    }

                    var passwordWithHash = hash.generate(reqbody.new_password);
                    if (!passwordWithHash) {
                        return new Promise(function(resolve, reject) {
                            reject({ errNum: 1013, status: 422 });
                        });
                    }
                    return ModelEmployee.update({
                        password: passwordWithHash
                    }, {
                        where: {
                            id: employee.id,
                            is_active: true
                        }
                    });
                } else {
                    return new Promise(function(resolve, reject) {
                        reject({ errNum: 1032, status: 500 });
                    });
                }
            }).then(function(result) {
                if (result) {
                    var employee = result.dataValues;
                    res.status(200).json({
                        employee: self._cleanEmployee(employee),
                        success: true
                    });
                } else {
                    self.getErrorApi().sendError(1033, 500, res);
                }
            }).catch(function(err) {
                if (err.errNum) {
                    self.getErrorApi().sendError(err.errNum, err.status, res);
                } else {
                    self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
                }
            });
        }
    }

    this.getEmployee = function(req, res) {
     
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
                        employee: self._cleanEmployee(employee),
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
