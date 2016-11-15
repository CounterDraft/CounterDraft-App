/*  Title: Admin Controller
    Author:  Hubbert
    Date: Nov 12 2016
    Comment: 
        This should be all the logic for the admin page.
*/

app.controller('AdminCtrl', ['$scope', '$http', '$location', '$window', 'data', function($scope, $http, $location, $window, data) {
    var _base_templates = "/templates/admin/";
    var _url_admin_login = "/api/v1/account/admin";
    var _url_application = "/api/v1/application";

    $scope.canEdit = false;

    $scope.prevPage = null;
    $scope.currentPage = null;
    $scope.address_types = [];
    $scope.organization_types = [];

    $scope.dashboardModal = {
        uptime: moment(),
        settings: []
    }

    $scope.loginModel = {
        username: null,
        password: null,
    }

    var _init = function() {
        //nothing;
    }
    var _getDefaultPage = function() {
        return _base_templates + 'dashboard.html';
    }
    this.initAdminLogin = function() {
        //nothing;
    }
    this.initAdminDashboard = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
        if (typeof 'undefined' != data) {
            $scope.dashboardModal.uptime = moment(data.uptime);
            if (data.settings) {
                for (var setting in data.settings) {
                    var set = {
                        label: setting,
                        value: data.settings[setting]
                    }
                    $scope.dashboardModal.settings.push(set);
                }
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
                // console.log($scope.organization_types);
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
    }

    this.onAddOrganizationType = function(){
        console.log('onAddOrganizationType');
    }

    this.onAddAddressType = function(){
        console.log('onAddAddressType');
    }

    this.removeOrganizationType = function(index){
        console.log('removeOrganizationType');
    }

    this.removeAddressType = function(index){
        console.log('removeAddressType');
    }

    this.onCreateAdmin = function(){
        console.log('onCreateAdmin');
    }

    this.onChangePassword = function(){
        console.log('onChangePassword');
    }

    $scope.onLogin = function() {
        var self = this;
        var formData = angular.copy($scope.loginModel);
        var hasData = false;

        for (var x in formData) {
            if (formData[x]) {
                hasData = true;
            }
        }

        if (hasData) {
            //post call to backend;
            $http({
                method: 'POST',
                url: _url_admin_login,
                data: formData,
            }).then(function successCallback(response) {
                $window.location.href = '/admin/dashboard';
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
                    });
                }
            });
        } else {
            $window.swal({
                title: "Error",
                text: "Missing required field!",
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
