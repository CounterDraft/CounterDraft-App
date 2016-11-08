/*  Title: Organization settings Controller
    Author:  Hubbert
    Date: Nov 03 2016
    Comment: 
        This should all the front end logic for the my organization settings page.
*/

app.controller('OrganizationCtrl', ['$scope', '$uibModal', '$http', '$anchorScroll', '$window', '$location', 'data', function($scope, $uibModal, $http, $anchorScroll, $window, $location, data) {
    var _base_templates = "templates/organization/";
    var _url_organization = "/api/v1/organization";
    var _url_organization_invite = "/api/v1/organization/invite";
    var _url_organization_employee = "/api/v1/organization/employee";
    var _url_organization_patron = "/api/v1/organization/patron";

    $scope.previousPage = null;
    $scope.currentPage = null;

    $scope.organizationModel = null;
    $scope.showEdit = false;
    $scope.editLocked = true;
    $scope.lockEmployeeForm = true;

    $scope.organization_types = [];

    $scope.patrons = [];
    $scope.employees = [];

    $scope.employeeInviteModel = {
        email_address: null,
        is_admin: false
    }

    $scope.employeeModel = {
        id: null,
        first_name: null,
        last_name: null,
        email_address: null,
        organization_id: null,
        password: 'placeholder',
        uuid: null
    }

    this.animationsEnabled = true;

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
        if (typeof 'undefined' != data && data.organization_types) {
            $scope.organization_types = data.organization_types;
        }
        //not sure if a non-admin can see this page but just in case.
        if (typeof 'undefined' != data && data.employee && data.employee.is_admin) {
            $scope.showEdit = true;
        }

        if (typeof 'undefined' != data && data.organization) {
            var formData = null;
            $http({
                method: 'GET',
                url: _url_organization,
                param: formData,
            }).then(function successCallback(response) {
                if (response.data && response.data.hasOwnProperty('organization')) {
                    $scope.organizationModel = response.data.organization;
                }
            }, function errorCallback(response) {
                var message = 'An unexpected error has occuried!';

                if (typeof 'undefined' != response &&
                    response.hasOwnProperty('data') &&
                    response.data.error.length > 0) {
                    message = response.data.error[0].msg;
                }
                $window.swal({
                    title: "Error",
                    text: message,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
            });
        }

        var errorMsgPatron = "Server is currently not available."
        $http({
            method: 'GET',
            url: _url_organization_patron
        }).then(function successCallback(response) {
            if (response && response.status === 200) {
                $scope.patrons = response.data.patrons;
            } else {
                console.error(errorMsgPatron);
            }
        }, function errorCallback(response) {
            if (response && response.hasOwnProperty('data') &&
                response.data.hasOwnProperty('error') &&
                response.data.error.length > 0) {
                errorMsgPatron = response.data.error[0].msg;
            }
            console.error(errorMsgPatron);
        });

        var errorMsgEmp = "Server is currently not available."
        $http({
            method: 'GET',
            url: _url_organization_employee
        }).then(function successCallback(response) {
            if (response && response.status === 200) {
                $scope.employees = response.data.employees;
            } else {
                console.error(errorMsgEmp);
            }
        }, function errorCallback(response) {
            if (response && response.hasOwnProperty('data') &&
                response.data.hasOwnProperty('error') &&
                response.data.error.length > 0) {
                errorMsgEmp = response.data.error[0].msg;
            }
            console.error(errorMsgEmp);
        });
    }

    this.initAddEmpoyee = function() {
        //nothing
    }

    this.initOrganization = function() {
        //nothing
    }

    this.initEmployeePage = function() {
        //nothing
    }

    this.onEdit = function() {
        $scope.editLocked = !$scope.editLocked;
    }
    this.onEnableEditEmployee = function(){
        $scope.lockEmployeeForm = !$scope.lockEmployeeForm;
    }

    this.onEditPatron = function(patron) {
        if (!$scope.editLocked) {
            window.location = '/patron?id=' + patron.id;
        } else {
            _showCannotEditAlert();
        }
    }

    this.onResetPassword = function(){
        if($scope.lockEmployeeForm){
            return;
        }
        console.log('send email to employee user' + $scope.employeeModel.id);
    }

    this.onEditEmployee = function(employee) {
        if (!$scope.editLocked) {
            $scope.employeeModel = employee;
            $scope.employeeModel.password = 'placeholder';
            $scope.onRoute('edit-employee', true);
        } else {
            _showCannotEditAlert();
        }
    }

    var _showCannotEditAlert = function() {
        var message = "Click the edit button at the top to edit!";
        $window.swal({
            title: "oops!",
            text: message,
            type: "info",
            confirmButtonColor: "#64d46f",
            confirmButtonText: "OK",
            closeOnConfirm: true,
            html: true
        });
    }

    $scope.onBack = function() {
        _preRoute();
        $scope.currentPage = $scope.previousPage;
        _postRoute();
    }

    $scope.onRoute = function(page) {
        _preRoute();
        if (page) {
            $scope.previousPage = $scope.currentPage;
            $scope.currentPage = _base_templates + page + '.html';
        }
        _postRoute();
    }
    var _clearModel = function(modalName) {
        if (!$scope[modalName]) {
            return;
        }
        angular.forEach($scope[modalName], function(value, key) {
            if (key.match(/is_admin/g)) {
                $scope[modalName][key] = false;
                return;
            }
            $scope[modalName][key] = null;
        });
    }

    var _resetForm = function(form, modelName) {
        _clearModel(modelName);
        form.$setPristine();
        form.$setUntouched();
        $scope.$broadcast('show-errors-reset');
    }

    $scope.onEmployeeInvite = function() {
        var self = this;
        var formData = angular.copy($scope.employeeInviteModel);
        var userNotFoundErrorMsg = "An unexpected error has occuried. Please contact CounterDraft support..";

        if (formData) {
            $http({
                method: 'POST',
                url: _url_organization_invite,
                data: formData,
            }).then(function successCallback(response) {
                if (response && response.status === 200) {
                    var employeeInvite = response.data.employeeInvite;
                    var msg = "Employee @ email address " + employeeInvite.email_address + " has been invited!";

                    $window.swal({
                        title: "Success",
                        text: msg,
                        type: "success",
                        confirmButtonColor: "#64d46f",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    }, function() {
                        _resetForm(self.employeeInviteForm, 'employeeInviteModel');
                        $scope.$apply();
                    });
                } else {
                    $window.swal({
                        title: "Error",
                        text: userNotFoundErrorMsg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                }
            }, function errorCallback(response) {
                if (response && response.hasOwnProperty('data') &&
                    response.data.hasOwnProperty('error') &&
                    response.data.error.length > 0) {
                    errorMsg = response.data.error[0].msg;
                    $window.swal({
                        title: "Error",
                        text: errorMsg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                }
            });
        } else {
            console.error(userNotFoundErrorMsg);
        }
    }
    this.saveEmployee = function() {
        var userNotFoundErrorMsg = "An unexpected error has occuried. Please contact CounterDraft support..";
        var formData = angular.copy($scope.employeeModel);

        if ($scope.employeeModel) {
            $http({
                method: 'PUT',
                url: _url_organization_employee,
                data: formData
            }).then(function successCallback(response) {
                if (response && response.status === 200) {
                    console.log(response);
                } else {
                    $window.swal({
                        title: "Error",
                        text: userNotFoundErrorMsg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                    $scope.showEdit = false;
                }
            }, function errorCallback(response) {
                var errorMsg = userNotFoundErrorMsg;
                if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('error') && response.data.error.length > 0) {
                    errorMsg = response.data.error[0].msg;
                }
                $window.swal({
                    title: "Error",
                    text: errorMsg,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
            });
        } else {
            $window.swal({
                title: "Error",
                text: userNotFoundErrorMsg,
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
        }
    }

    this.saveForm = function() {
        if ($scope.editLocked) {
            return;
        }
        var userNotFoundErrorMsg = "An unexpected error has occuried. Please contact CounterDraft support..";
        var organization = angular.copy($scope.organizationModel);
        var formData = {
            name: organization.name,
            type: organization.type,
            description: organization.description,
            patron_registration_email: organization.patron_registration_email,
            employee_registration_email: organization.employee_registration_email,
            multi_admin: organization.multi_admin,
            password_expire_time: organization.password_expire_time
        }

        if (formData) {
            $http({
                method: 'PUT',
                url: _url_organization,
                data: formData,
            }).then(function successCallback(response) {
                if (response && response.status === 200) {
                    // console.log(response);
                } else {
                    $window.swal({
                        title: "Error",
                        text: userNotFoundErrorMsg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                }
            }, function errorCallback(response) {
                if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('error') && response.data.error.length > 0) {
                    errorMsg = response.data.error[0].msg;
                    $window.swal({
                        title: "Error",
                        text: errorMsg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                }
            });
        } else {
            console.error(userNotFoundErrorMsg);
        }
    }

    this.onAddEmployee = function() {
        $scope.onRoute('add-employee');
    }
    this.onAddPatron = function() {
        window.location = '/patron?page=patron-add';
    }

    var _preRoute = function() {

    }

    var _postRoute = function() {
        $anchorScroll();
        $scope.editLocked = true;
    }

    var _getDefaultPage = function() {
        return _base_templates + 'organization.html';
    }

    _init();

}]);
