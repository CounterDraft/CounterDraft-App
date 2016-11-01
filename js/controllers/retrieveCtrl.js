/*  Title: Retrieve Controller
    Author:  Hubbert
    Date: Oct 31 2016
    Comment: 
        This should be all the logic for the retrieve page.
*/

app.controller('RetrieveCtrl', ['$scope', '$http', '$location', '$window', 'data', function($scope, $http, $location, $window, data) {
    var _base_templates = "templates/retrieve/";
    var _url_change_password = "/api/v1/reset/resetChangePassword";
    $scope.prevPage = null;
    $scope.currentPage = null;

    $scope.recoverModel = {
        password: null,
        password_confirm: null,
        retrieve_token: null
    }
    $scope.patron = null;
    $scope.employee = null;

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
        $('body:not(.retrieve-background)').addClass('retrieve-background');
    }

    this.initPasswordRecovery = function() {
        var errorMsg = null;

        if (typeof 'undefined' != data) {
            if (data.hasOwnProperty('error') && data.error.hasOwnProperty('msg')) {
                errorMsg = data.error.msg;
            } else if (data.hasOwnProperty('patron')) {
                $scope.patron = data.patron;
                console.log($scope.patron);
            } else if (data.hasOwnProperty('employee')) {
                $scope.employee = data.employee;
                console.log($scope.employee);
            } else {
                errorMsg = "Unknown server error, system could be down!";
            }
        }

        if ($location.search().retrieve_token) {
            $scope.recoverModel.retrieve_token = $location.search().retrieve_token;
        }

        if (errorMsg) {
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
    }

    var _getDefaultPage = function() {
        return _base_templates + 'retrieve.html';
    }

    this.onBack = function() {
        $scope.currentPage = $scope.prevPage;
    }

    this.onClose = function() {
        $scope.currentPage = $scope.prevPage;
    }

    $scope.onSubmit = function() {
        var self = this;
        var formData = angular.copy($scope.recoverModel);
        var hasData = true;
        var errorMsg = 'Form is missing data.';

        for (var x in formData) {
            if (!formData[x]) {
                hasData = false;
            }
        }

        if (!(formData.password_confirm === formData.password)) {
            errorMsg = "Password doesn't match";
            hasData = false;
        }

        if (hasData) {
            $http({
                method: 'PUT',
                url: _url_change_password,
                data: formData,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.error(response);
            });
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
    }

    _init();

}]);
