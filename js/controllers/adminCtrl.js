/*  Title: Admin Controller
    Author:  Hubbert
    Date: Nov 12 2016
    Comment: 
        This should be all the logic for the admin page.
*/

app.controller('AdminCtrl', ['$scope', '$http', '$location', '$window', 'data', function($scope, $http, $location, $window, data) {
    var _base_templates = "/templates/admin/";
    var _url_admin_login = "/api/v1/account/admin";

    $scope.prevPage = null;
    $scope.currentPage = null;

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
