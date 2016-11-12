/*  Title: Admin Controller
    Author:  Hubbert
    Date: Nov 12 2016
    Comment: 
        This should be all the logic for the admin page.
*/

app.controller('AdminCtrl', ['$scope', '$http', '$location', '$window', 'data', function($scope, $http, $location, $window, data) {
    var _base_templates = "templates/admin/";
    $scope.prevPage = null;
    $scope.currentPage = null;

    $scope.loginModel = {
        username: null,
        password: null,
    }

    var _init = function() {
        //nothign;
    }
    var _getDefaultPage = function() {
        return _base_templates + 'dashboard.html';
    }
    this.initAdminLogin = function() {
        console.log('asds');
    }
    this.initAdminDashboard = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    }
    $scope.onLogin = function() {
        var self = this;
        var formData = angular.copy($scope.loginModel);
        console.log(formData)
    }

    _init();

}]);
