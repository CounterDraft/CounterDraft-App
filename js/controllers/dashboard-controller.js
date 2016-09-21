/*  Title: Dashboard Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the Dashboard page.
*/

app.controller('DashboardCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/dashboard/";
    $scope.currentPage = null;

    //quick data;
    $scope.total_patrons = null;
    $scope.daily_active_users = null;

    //models
    $scope.user_model = { username: 'anonymous' };

    var _init = function() {
        if (typeof 'undefined' != data && data.user) {
            $scope.user_model = data.user;
        }
        //default page;
        $scope.currentPage = _getDefaultPage();
    };

    $scope.onRoute = function(page) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
    };

    var _getDefaultPage = function() {
        return _base_templates + 'dashboard.html';
    }

    this.getCharts = function() {
        $scope.total_patrons = 999999;
        $scope.daily_active_users = 999999;
    }

    _init();

}]);
