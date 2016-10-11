/*  Title: Dashboard Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the Dashboard page.
*/

app.controller('DashboardCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/dashboard/";
    var _dashboard_patron_url = "/api/v1/dashboard/patron";
    var _dashboard_game_url = "/api/v1/dashboard/game";
    var _patron_total_url = "/api/v1/patron/total";
    var _game_total_url = "/api/v1/game/total";

    $scope.currentPage = null;
    $scope.timeSelect = null;

    //options;
    $scope.timeSpan = ['none'];

    //quick data;
    $scope.total_patrons = 0;
    $scope.daily_active_users = 0;
    $scope.active_games = 0;

    //models
    $scope.user_model = { username: 'anonymous' };

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initDash = function() {
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

        $http({
            method: 'GET',
            url: _patron_total_url
        }).then(function successCallback(response) {
            if (typeof 'undefined' != response &&
                response.hasOwnProperty('data') &&
                response.data.hasOwnProperty('total')) {
                $scope.total_patrons = response.data['total'];
            }
        }, function errorCallback(response) {
            console.error(response);
        });

        $http({
            method: 'GET',
            url: _game_total_url
        }).then(function successCallback(response) {
            if (typeof 'undefined' != response &&
                response.hasOwnProperty('data') &&
                response.data.hasOwnProperty('total')) {
                $scope.active_games = response.data['total'];
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }

    this.onTimeChange = function() {
        var formData = {
            duration: $scope.timeSelect
        }

        $http({
            method: 'GET',
            url: _dashboard_patron_url,
            params: formData
        }).then(function successCallback(response) {
            console.log(response.data);
            return $http({
                method: 'GET',
                url: _dashboard_game_url,
                params: formData
            });
        }, function errorCallback(response) {
            console.error(response);
        }).then(function successCallback(response) {
            console.log(response.data);

        }, function errorCallback(response) {
            console.error(response);
        });
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
