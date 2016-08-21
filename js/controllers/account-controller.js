/*  Title: Login Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the login page.
*/

app.controller('AccountCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _url_login = "/api/v1/account/login";
    var _url_registration = "/api/v1/account/registration";
    var _base_templates = 'templates/login/';
    $scope.registrationModel = {
        first_name: '',
        last_name: '',
        email_address: '',
        password: '',
        password_confirm: ''
    };
    $scope.loginModel = {
        username: '',
        password: ''
    };

    var _init = function() {
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
        } else {
            //post call to backend;
            $http({
                method: 'POST',
                url: _url_registration,
                data: formData
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
                url: _url_registration,
                data: formData
            }).then(function successCallback(response) {
                $window.location.href = '/dashboard';
            }, function errorCallback(response) {
                console.error(response);
            });
        }
    };

    _init();

}]);
