/*  Title: Game Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the game page.
*/

app.controller('GameCtrl', ['$rootScope', '$scope', '$http', '$window', '$anchorScroll', '$uibModal', 'data', function($rootScope, $scope, $http, $window, $anchorScroll, $uibModal, data) {

    var _base_templates = "templates/game/";
    var _url_game_search = "/api/v1/game/search/";
    var _url_application = "/api/v1/application";
    var _url_game_create = "/api/v1/game/create/";

    $scope.currentPage = null;

    $scope.searchArr = [];
    $scope.league_types = [];
    $scope.game_types = [];

    //models
    $scope.gameModel = {
        salaryCap: null,
        entryFee: null,
        start: null,
        end: null,
        maxPlayers: null,
        minPlayers: null,
        holding: null,
        winners: 0,
        type: null,
        league: null
    }

    $scope.gameSearchModel = {
        id: null,
        league: null,
        start: null,
        end: null,
        type: null
    }

    $scope.league = null;

    $scope.payouts = [];

    $scope.currentDate = moment().toDate();

    $scope.$watch('gameModel.league', function(newValue, oldValue, controller) {
        if (newValue && $scope.league_types) {
            angular.forEach($scope.league_types, function(value, key) {
                if (newValue === value.id) {
                    $scope.league = value;
                }
            });
        }
    }, true);

    $scope.$watch('gameModel.winners', function(newValue, oldValue, controller) {
        $scope.payouts = [];
        for (var i = 0; i < newValue; i++) {
            $scope.payouts.push({
                place: i + 1,
                percentage: null
            });
        }
    }, true);

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

    $scope.getNumber = function(num) {
        return new Array(num);
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
        var self = this;
        switch (step) {
            case 1:
                $scope.onRoute('add-game-step-2', false);
                break;
            case 2:
                $scope.onRoute('add-game-step-3', false);
                break;
            case 3:
                _checkPayouts($scope.payouts)
                    .then(function(result) {
                        _showSummaryModal();
                    }).catch(function(err) {
                        if (err) {
                            $window.swal({
                                title: "Error",
                                text: err,
                                type: "error",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "OK",
                                closeOnConfirm: true,
                                html: true
                            });
                        }
                    });
                break;
            default:
                break;
        }
    }

    var _checkPayouts = function(payouts) {
        return new Promise(function(reslove, reject) {
            var count = 0;
            angular.forEach(payouts, function(payout, key) {
               count += payout.percentage;
            });
            if(count === 100){
                return reslove(count);
            } else if (count < 100){
                return reject('Total amount is less then 100%');
            }else{
                return reject('Total amount is greater then 100%');
            } 
        });
    }

    var _showSummaryModal = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'game-summary-modal.html',
            controller: 'GameSummaryCtrl',
            controllerAs: 'mCtrl',
            size: 'lg',
            scope: $scope,
            backdrop: 'static',
            keyboard: false
        });

        modalInstance.result.then(function(isConfirmed) {
            if (isConfirmed) {
                $scope.onCreateGame(angular.copy($scope.gameModel), angular.copy($scope.payouts));
            } else {
                // console.info('Modal dismissed at: ' + new Date());
            }
        }, function() {
            // console.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.onCreateGame = function(formData, payouts) {
        var self = this;
        var hasData = false;
        var errorMsg = "Unknown server error, service is currently down.";

        angular.extend(formData, {payouts: payouts});
        console.log(formData);

        for (var x in formData) {
            if (formData[x]) {
                hasData = true;
            }
        }
        if (hasData) {
            //POST call to backend;
            $http({
                method: 'POST',
                url: _url_game_create,
                data: formData,
            }).then(function successCallback(response) {
                if (response && response.hasOwnProperty('data') && response.data.game) {
                    console.log(response);
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
            }, function errorCallback(response) {
                var data = response.data || null;
                if (data && data.hasOwnProperty('error')) {
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
                text: "Opps, missing required field!",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
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
                if (response && response.hasOwnProperty('data') && response.data.games.length > 0) {
                    var games = []
                    angular.forEach(response.data.games, function(value, key) {
                        var game = value;
                        if (game.createAt) {
                            game.createAt = moment.unix(game.createAt).toDate();
                        }
                        if (game.start) {
                            game.start = moment.unix(game.start).toDate();
                        }
                        if (game.end) {
                            game.end = moment.unix(game.end).toDate();
                        }
                        if (game.updatedAt) {
                            game.updatedAt = moment.unix(game.updatedAt).toDate();
                        }
                        games.push(game);
                    });
                    $scope.searchArr = games;
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
