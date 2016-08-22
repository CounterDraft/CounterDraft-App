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
        first_name: '',
        last_name: '',
        email_address: '',
        password: '',
        password_confirm: '',
        organization_name: '',
        organization_type: '',
        organization_description: '',
        organization_hash: ''
    };

    $scope.loginModel = {
        username: '',
        password: ''
    };

    $scope.resetModal = {
        username: '',
        email_address: ''
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
        return _base_templates + 'login.html';
    }

    $scope.onRoute = function(page) {
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
        if (!formData) {
            return "Error: no data submitted";
        } else if (!formData.first_name) {
            return "Error: First name is required!";
        } else if (!formData.last_name) {
            return "Error: Last name is required!";
        } else if (!formData.email_address) {
            return "Error: Email address is required!";
        } else if (!formData.last_name) {
            return "Error: Last name is required!";
        } else if (formData.password != formData.password_confirm || !formData.password) {
            return "Error: Password field is required!";
        } else if (!formData.organization_name || !formData.organization_hash) {
            return "Error: A organization is needed to registration an employee.";
        } else {
            //post call to backend;
            $http({
                method: 'POST',
                url: _url_registration,
                data: formData,
            }).then(function successCallback(response) {
                console.log(response);
                $window.location.href = '/dashboard';
            }, function errorCallback(response) {
                console.error(response);
            });
        }
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
                console.error(response);
            });
        }
    };

    _init();

}]);
