/*  Title: Dashboard Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the Dashboard page.
*/

app.controller('DashboardCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/dashboard/";
    var _dashboard_patron_url = "/api/v1/dashboard/patron";
    var _dashboard_games_url = "/api/v1/dashboard/game";
    $scope.currentPage = null;
    $scope.timeSelect = null;

    //options;
    $scope.timeSpan = ['none'];

    //quick data;
    $scope.total_patrons = null;
    $scope.daily_active_users = null;
    $scope.active_games = null;

    //models
    $scope.user_model = { username: 'anonymous' };

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initDash = function() {
        $scope.total_patrons = 99;
        $scope.daily_active_users = 99;
        $scope.active_games = 59;
        if (typeof 'undefined' != data) {
            if (data.user) {
                $scope.user_model = data.user;
            }
            if (data.timeSpans) {
                $scope.timeSpan = data.timeSpans;
                $scope.timeSelect = $scope.timeSpan[$scope.timeSpan.length - 1];
                this.onTimeChange();
            }
        }
    }

    this.onTimeChange = function(){
        console.log($scope.timeSelect);
    }

    $scope.onRoute = function(page) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
    }

    var _getDefaultPage = function() {
        return _base_templates + 'dashboard.html';
    }

    _init();

}]);
