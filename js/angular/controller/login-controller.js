/*  Title: Login Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the login page.
*/

app.controller('loginCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _url = "/api/v1/account/login";
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


    $scope.currentPage = 'templates/login/login.html';

    var _init = function() {
        //default page;
        $scope.currentPage = _base_templates + 'login.html';
    };

    $scope.onRoute = function(page) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
    };

    $scope.onRegistration = function() {
        // $scope.$digest();
        var formData = $scope.registrationModel;
        console.log(formData);
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
                url: _url,
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
