/*  Title: Dashboard Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the Dashboard page.
*/

app.controller('DashCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/dashboard/";
    var _dashboard_patron_url = "/api/v1/dashboard/patron";
    var _dashboard_game_url = "/api/v1/dashboard/game";
    var _patron_total_url = "/api/v1/patron/total";
    var _game_total_url = "/api/v1/game/total";

    $scope.currentPage = null;
    $scope.timeSelect = null;

    //options;
    $scope.timeSpan = ['none'];

    $scope.chartData = null;

    //quick data;
    $scope.total_patrons = 0;
    $scope.daily_active_users = 0;
    $scope.active_games = 0;

    // line-data='[
    //         { y: "2010", a: 100, b: 90 },
    //         { y: "2011", a: 75,  b: 65 },
    //         { y: "2012", a: 50,  b: 40 },
    //         { y: "2013", a: 75,  b: 65 },
    //         { y: "2014", a: 50,  b: 40 },
    //         { y: "2015", a: 75,  b: 65 },
    //         { y: "2016", a: 99, b: 99 }
    //     ]'

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
                this.onTimeChange($scope.timeSpan[$scope.timeSpan.length - 1]);
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
            // console.error(response);
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
            // console.error(response);
        });
    }

    this.onTimeChange = function(duration) {
        var formData = {
            duration: duration
        }
        
        var patronData = null;
        var gameData = null;

        $http({
            method: 'GET',
            url: _dashboard_patron_url,
            params: formData
        }).then(function successCallback(response) {
            patronData = response.data;
            return $http({
                method: 'GET',
                url: _dashboard_game_url,
                params: formData
            });
        }).then(function successCallback(response) {
            gameData = response.data;
            _updateLineGraph(patronData.counts, gameData.counts);

        }, function errorCallback(response) {
            console.error(response);
        });
    }

    $scope.onRoute = function(page) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
    }

    var _updateLineGraph = function(patronCountObj, gameCountObj) {
        var newData = [];
        var patronData = [];
        var gameData = [];
        var yData = [];

        var duration = angular.copy($scope.timeSelect);

        angular.forEach(patronCountObj, function(value, key) {
            var date = moment(value.date_ts).format('MM-DD-YYYY');
            var count = value.count;
            yData.push(date);
            patronData.push(count);
        });

        angular.forEach(gameCountObj, function(value, key) {
            var date = moment(value.date_ts).format('MM-DD-YYYY');
            var count = value.count;
            gameData.push(count);
        });

        angular.forEach(yData, function(value, key) {
            newData.push({ y: yData[key], patrons: patronData[key], games: gameData[key] });
        });

        $scope.chartData = newData;
    }

    var _getDefaultPage = function() {
        return _base_templates + 'dashboard.html';
    }

    _init();

}]);
