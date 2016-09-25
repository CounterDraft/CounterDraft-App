/*  Title: Login Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the login page.
*/

app.controller('AccountCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _url_login = "/api/v1/account/login";
    var _url_registration = "/api/v1/account/registration";
    var _base_templates = "templates/login/";
    var _url_reset = "application/reset";

    $scope.registrationModel = {
        first_name: null,
        last_name: null,
        email_address: null,
        password: null,
        password_confirm: null,
        organization_name: null,
        organization_type: null,
        organization_description: null,
        organization_hash: null
    };

    $scope.loginModel = {
        username: null,
        password: null
    };

    $scope.resetModal = {
        username: null,
        email_address: null
    };

    $scope.showResetPassword = null;
    $scope.organization_types = [];

    var _init = function() {
        if (typeof 'undefined' != data && data.organization_types) {
            $scope.organization_types = data.organization_types;
        }
        $scope.showResetPassword = false;

        //default page;
        $scope.currentPage = _getDefaultPage();
    };

    var _getDefaultPage = function() {
        $('body:not(.login-background)').addClass('login-background');
        return _base_templates + 'login.html';
    }

    $scope.onRoute = function(page) {
        $('body').removeClass('login-background');
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
        angular.forEach($scope.resetModal, function(value, key) {
            $scope.resetModal[key] = '';
        });
        $scope.showResetPassword = false;
    };

    $scope.onShowReset = function() {
        if ($scope.showResetPassword) {
            $scope.showResetPassword = false;
        } else {
            $scope.showResetPassword = true;
        }
    };

    $scope.onReset = function() {
        var formData = $scope.resetModal;
        if (!formData) {
            return "Error: no data submitted";
        } else if (!formData.username && !formData.email_address) {
            return "Error: Username is required or email address";
        } else {
            //post call to backend;
            $http({
                method: 'PUT',
                url: _url_reset,
                data: formData,
            }).then(function successCallback(response) {
                console.log(response);
                //show message to check your email.
            }, function errorCallback(response) {
                console.error(response);
            });
        }
    };

    $scope.onRegistration = function() {
        var formData = $scope.registrationModel;
        var errorMessage = [];
        if (!formData) {
            errorMessage.push("No data submitted");
        } else if (!formData.first_name) {
            errorMessage.push("First name is required");
        } else if (!formData.last_name) {
            errorMessage.push("Last name is required");
        } else if (!formData.email_address) {
            errorMessage.push("Email address is required");
        } else if (!formData.last_name) {
            errorMessage.push("Last name is required");
        } else if (!formData.password) {
            errorMessage.push("Password is required");
        } else if (formData.password != formData.password_confirm) {
            errorMessage.push("Password does not match password confirmation");
        } else if (!formData.organization_name  && !formData.organization_type && !formData.organization_hash) {
            errorMessage.push("Organization name and type Or Oranization invite must be entered.");
        } else if (!formData.organization_hash  && !formData.organization_type && formData.organization_name) {
            errorMessage.push("Organization type must be selected");
        } else if (!formData.organization_hash && formData.organization_type && !formData.organization_name) {
            errorMessage.push("Organization name must be entered");
        }

        if(errorMessage.length > 0){
            $window.swal({
                    title: "Error",
                    text: errorMessage,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
            return;
        }

        //post call to backend;
        $http({
            method: 'POST',
            url: _url_registration,
            data: formData,
        }).then(function successCallback(response) {
            $window.location.href = '/dashboard';
        }, function errorCallback(response) {
            var data = response.data || null;
            if (data && data.error.length > 0) {
                var error = data.error[0];
                $window.swal({
                    title: "Error",
                    text: error.msg,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                }, function() {
                    //callback
                });
            }
        });

    };

    $scope.onClose = function() {
        $scope.currentPage = _getDefaultPage();
        angular.forEach($scope.registrationModel, function(value, key) {
            $scope.registrationModel[key] = '';
        });
    };

    $scope.onSubmit = function() {
        var formData = $scope.loginModel;
        if (!formData) {
            return "Error: no data submitted";
        } else if (!formData.username) {
            return "Error: Username is required!";
        } else if (!formData.password) {
            return "Error: Username is password!";
        } else {
            //post call to backend;
            $http({
                method: 'POST',
                url: _url_login,
                data: formData,
            }).then(function successCallback(response) {
                $window.location.href = '/dashboard';
            }, function errorCallback(response) {
                var data = response.data || null;
                if (data && data.error.length > 0) {
                    var error = data.error[0];
                    $window.swal({
                        title: "Error",
                        text: error.msg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    }, function() {
                        //callback
                    });
                }

            });
        }
    };

    _init();

}]);
