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
    var _url_organization_address = "/api/v1/organization/address";
    var _url_application = "/api/v1/application";

    $scope.previousPage = null;
    $scope.currentPage = null;
    $scope.user = null;

    $scope.organizationModel = null;
    $scope.showEdit = false;
    $scope.editLocked = true;
    $scope.lockEmployeeForm = true;

    $scope.addressArr = [];

    $scope.organization_types = [];
    $scope.address_types = [];

    $scope.settingChange = {};

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
        //not sure if a non-admin can see this page but just in case.
        if (typeof 'undefined' != data && data.employee) {
            $scope.user = data.employee;
            if (data.employee.is_admin) {
                $scope.showEdit = true;
            }
        }

        $http({
            method: 'GET',
            url: _url_application + '/address',
        }).then(function successCallback(response) {
            if (response.data && response.data.hasOwnProperty('address_types')) {
                $scope.address_types = response.data.address_types;
                // console.log($scope.address_types);
            }
        }, function errorCallback(response) {
            var message = 'An unexpected error has occuried!';

            if (typeof 'undefined' != response &&
                response.hasOwnProperty('data') &&
                response.data.error.length > 0) {
                message = response.data.error[0].msg;
            }
            console.error(message);
        });

        $http({
            method: 'GET',
            url: _url_application + '/organization',
        }).then(function successCallback(response) {
            if (response.data && response.data.hasOwnProperty('organization_types')) {
                $scope.organization_types = response.data.organization_types;
            }
        }, function errorCallback(response) {
            var message = 'An unexpected error has occuried!';
            if (typeof 'undefined' != response &&
                response.hasOwnProperty('data') &&
                response.data.error.length > 0) {
                message = response.data.error[0].msg;
            }
            console.error(message);
        });


        if (typeof 'undefined' != data && data.organization) {
            var formData = null;
            $http({
                method: 'GET',
                url: _url_organization,
                param: formData,
            }).then(function successCallback(response) {
                if (response.data && response.data.hasOwnProperty('organization')) {
                    var organization = angular.copy(response.data.organization);
                    if (organization.phone) {
                        organization.phone = parseInt(organization.phone);
                    }
                    $scope.organizationModel = organization;
                    $scope.addressArr = response.data.organization.address;
                    $scope.$watchCollection('addressArr', _saveAddress);
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
                $scope.$watchCollection('addressArr', _saveAddress);
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
        //default page;
        $scope.currentPage = _getDefaultPage();
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

    this.getOrganizationAddress = function() {
        //nothing   
    }

    var _saveAddress = function(newArr, oldArr, scope) {
        if (newArr.length != oldArr.length) {
            if (newArr.length > oldArr.length) {
                var newAddress = newArr[newArr.length - 1];
                var errorMsg = "Failed to add address";

                $http({
                    method: 'POST',
                    url: _url_organization_address,
                    data: newAddress,
                }).then(function successCallback(response) {
                    if (response && response.status === 200 && response.data) {
                        newAddress.id = response.data.address.id;
                        console.log(response);
                    } else {
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
                }, function errorCallback(response) {
                    if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('error') &&
                        response.data.error.length > 0) {
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
            }
        }
    }

    this.removeAddress = function(index) {
        var self = this;
        var address = $scope.addressArr[index];
        var errorMsg = "Failed to remove address";
        if ($scope.editLocked) {
            return;
        }

        $http({
            method: 'DELETE',
            url: _url_organization_address,
            params: address,
        }).then(function successCallback(response) {
            if (response && response.status === 200) {
                $scope.addressArr.splice(index, 1);
            } else {
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
        }, function errorCallback(response) {
            if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('error') &&
                response.data.error.length > 0) {
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
    }

    this.onAddAddress = function(form) {
        var self = this;
        $scope.noExtra = false;
        var modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'add-address-modal.html',
            controller: 'AddAddressCtrl',
            controllerAs: 'mCtrl',
            size: 'lg',
            scope: $scope
        });
        modalInstance.result.then(function(place) {
            $scope.addressArr.push(place);
        }, function() {
            console.info('Modal dismissed at: ' + new Date());
        });
    }

    this.onEdit = function() {
        $scope.editLocked = !$scope.editLocked;
    }
    this.onEnableEditEmployee = function() {
        $scope.lockEmployeeForm = !$scope.lockEmployeeForm;
    }

    this.onEditPatron = function(patron) {
        if (!$scope.editLocked) {
            window.location = '/patron?id=' + patron.id;
        } else {
            _showCannotEditAlert();
        }
    }

    this.onSettingChange = function(name, value) {
        $scope.settingChange[name] = value;
    }

    this.onResetPassword = function(form) {
        var self = this;
        if ($scope.lockEmployeeForm) {
            return;
        }
        var modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            scope: $scope,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'employee-password-reset-modal.html',
            controller: 'PasswordResetModalCtrl',
            controllerAs: 'mCtrl',
            size: 'lg'
        });

        modalInstance.result
            .then(function(result) {
                if (result.status) {
                    var msg = "New password email has been sent.";
                    $window.swal({
                        title: "Success",
                        text: msg,
                        type: "success",
                        confirmButtonColor: "#64d46f",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    }, function() {
                        $scope.$apply();
                    });
                } else {
                    $window.swal({
                        title: "Error",
                        text: result.errorMsg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                }
            }, function() {
                console.info('Modal dismissed at: ' + new Date());
            });
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
        if (modelName) {
            _clearModel(modelName);
        }
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
        var formData = {
            id: $scope.employeeModel.id,
            email_address: $scope.employeeModel.email_address,
            first_name: $scope.employeeModel.first_name,
            last_name: $scope.employeeModel.last_name,
            username: $scope.employeeModel.username,
            is_admin: $scope.employeeModel.is_admin
        }
        if ($scope.lockEmployeeForm) {
            return;
        }

        if ($scope.employeeModel) {
            $http({
                method: 'PUT',
                url: _url_organization_employee,
                data: formData
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
        var userNotFoundErrorMsg = "An unexpected error has occuried. Please contact CounterDraft support..";
        var organization = angular.copy($scope.organizationModel);
        if (organization.hasOwnProperty('phone') && organization.phone && organization.phone.toString().length === 10) {
            var p = 1 + organization.phone.toString();
            organization.phone = p;
        }
        var formData = {
            name: organization.name,
            type: organization.type,
            description: organization.description,
            patron_registration_email: organization.patron_registration_email,
            multi_admin: organization.multi_admin,
            password_expire_time: organization.password_expire_time,
            phone: organization.phone
        }
        var submit = function(clearAdmin) {
            if (formData) {
                $http({
                    method: 'PUT',
                    url: _url_organization,
                    data: formData,
                }).then(function successCallback(response) {
                    if (response && response.status === 200) {
                        // console.log(response);
                        $window.swal.close();
                        if (clearAdmin) {
                            angular.forEach($scope.employees, function(employee, key) {
                                if ($scope.user.id !== employee.id) {
                                    employee.is_admin = false;
                                }
                            });
                        }
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
            $scope.settingChange = {};
        }

        if ($scope.editLocked) {
            return;
        }

        if ($scope.settingChange.hasOwnProperty('multi_admin') && $scope.settingChange.multi_admin === 'true') {
            $window.swal({
                    title: "Are you sure?",
                    text: "Changing the multiple administrators setting to 'No' will remove administrator rights to all other accounts!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#64d46f",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        submit(true);
                    } else {
                        angular.forEach($scope.settingChange, function(value, key) {
                            $scope.organizationModel[key] = Boolean(value);
                        });
                        $scope.settingChange = {};
                        $scope.$apply()
                    }
                });
            return;
        }
        submit(false);
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
        $scope.lockEmployeeForm = true;
        $anchorScroll();
    }

    var _getDefaultPage = function() {
        return _base_templates + 'organization.html';
    }

    _init();

}]);
