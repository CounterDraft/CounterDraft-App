/*  Title: Retrieve Controller
    Author:  Hubbert
    Date: Oct 31 2016
    Comment: 
        This should be all the logic for the retrieve page.
*/

app.controller('RetrieveCtrl', ['$scope', '$http', '$location', '$window', 'data', function($scope, $http, $location, $window, data) {
    var _base_templates = "templates/retrieve/";
    var _url_patron = "/api/v1/patron/";
    var _url_employee = "/api/v1/user/";

    $scope.prevPage = null;
    $scope.currentPage = null;

    $scope.recoverModel = {
        password: null,
        password_confirm: null,
        retrieve_token: null,
        email_address: null
    }

    $scope.patron = null;
    $scope.employee = null;

    $scope.formEnabled = false;

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
        $('body:not(.retrieve-background)').addClass('retrieve-background');
    }

    this.initPasswordRecovery = function() {
        var errorMsg = null;

        if (typeof 'undefined' != data) {
            if (data.hasOwnProperty('error') && data.error.hasOwnProperty('msg')) {
                $scope.formEnabled = true;
                errorMsg = data.error.msg;
            } else if (data.hasOwnProperty('patron')) {
                $scope.patron = data.patron;
            } else if (data.hasOwnProperty('employee')) {
                $scope.employee = data.employee;
            } else {
                $scope.formEnabled = true;
                errorMsg = "Unknown server error, system could be down!";
            }
        }

        if ($location.search().retrieve_token) {
            $scope.recoverModel.retrieve_token = $location.search().retrieve_token;
        }
        if ($location.search().email_address) {
            $scope.recoverModel.email_address = $location.search().email_address;
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
        if ($location.search().retrieve_token) {
            $scope.recoverModel.retrieve_token = $location.search().retrieve_token;
        }
        if ($location.search().email_address) {
            $scope.recoverModel.email_address = $location.search().email_address;
        }
        var formData = angular.copy($scope.recoverModel);
        var hasData = true;
        var errorMsg = 'Form is missing data.';
        var put_url = null;

        if ($scope.patron) {
            put_url = _url_patron + 'recover';
        } else if ($scope.employee) {
            put_url = _url_employee + 'recover';
        }

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
                url: put_url,
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
