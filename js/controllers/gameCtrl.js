/*  Title: Game Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the game page.
*/

app.controller('GameCtrl', ['$scope', '$http', '$window', '$anchorScroll', 'data', function($scope, $http, $window, $anchorScroll, data) {
    var _base_templates = "templates/game/";
    var _url_game_search = "/api/v1/game/search/";
    var _url_application = "/api/v1/application";

    $scope.currentPage = null;

    $scope.searchArr = [];
    $scope.league_types = [];
    $scope.game_types = [];
    //models
    $scope.gameModel = {}

    $scope.gameSearchModel = {
        id: null,
        league: null,
        start: null,
        end: null
    }

    $scope.currentDate = moment().toDate();

    var _init = function() {

        $http({
            method: 'GET',
            url: _url_application + '/league',
        }).then(function successCallback(response) {
            if (response.data && response.data.hasOwnProperty('league_types')) {
                $scope.league_types = response.data.league_types;
                // console.log($scope.league_types);
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
            url: _url_application + '/game_type',
        }).then(function successCallback(response) {
            if (response.data && response.data.hasOwnProperty('game_types')) {
                $scope.game_types = response.data.game_types;
                // console.log($scope.game_types);
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

        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initSearch = function() {
        //nothing
    }

    this.initResults = function() {
        //nothing 
        console.log('initResults section');
    }

    var _getDefaultPage = function() {
        return _base_templates + 'game.html';
    }

    var _clearModel = function(modalName) {
        if (!$scope[modalName]) {
            return;
        }
        angular.forEach($scope[modalName], function(value, key) {
            $scope[modalName][key] = null;
        });
    }

    $scope.onRoute = function(page, doNotClear) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
        if (!doNotClear) {
            _clearModel('gameSearchModel');
            $scope.addressArr = [];
        }
        $anchorScroll();
    }

    $scope.onClose = function() {
        $scope.currentPage = _getDefaultPage();
        _clearModel('gameModel');
    }

    $scope.gameSearchFormValue = function() {
        var is_good = true;
        for (var x in $scope.gameSearchModel) {
            if ($scope.gameSearchModel[x]) {
                is_good = false;
            }
        }
        return is_good;
    }

    $scope.onGameCreate = function(step) {
        switch (step) {
            case 1:
                $scope.onRoute('add-game-step-2', false);
                break;
            case 2:
                console.log('we are on step two');
                break;
            default:
                break;
        }
    }

    $scope.onGameSearch = function() {
        var self = this;
        var formData = angular.copy($scope.gameSearchModel);
        var hasData = false;

        for (var x in formData) {
            if (formData[x]) {
                hasData = true;
            }
        }

        if (hasData) {
            //GET call to backend;
            $http({
                method: 'GET',
                url: _url_game_search,
                params: formData,
            }).then(function successCallback(response) {
                if (response && response.hasOwnProperty('data') && response.data.games.length >= 0) {
                    var games = []
                    angular.forEach(response.data.games, function(value, key) {
                        var game = value;
                        patrons.push(game);
                    });
                    $scope.searchArr = games;
                    console.log($scope.searchArr);
                    $scope.onRoute('game-results', true);
                } else {
                    $window.swal({
                        title: "results",
                        text: "No games found.",
                        type: "info",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                }
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
                } else {
                    console.error(response);
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
