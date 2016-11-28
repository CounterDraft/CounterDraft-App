/*  Title: Game Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the game page.
*/

app.controller('GameCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/game/";
    $scope.currentPage = null;

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
        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initSearch = function(){
      //nothing
      console.log($scope.gameSearchModel);
    }

    var _getDefaultPage = function() {
        return _base_templates + 'game.html';
    }

    $scope.onRoute = function(page) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
    }

    $scope.onClose = function() {
        $scope.currentPage = _getDefaultPage();
        angular.forEach($scope.patronModel, function(value, key) {
            $scope.patronModel[key] = '';
        });
    }

    $scope.onClose = function() {
        $scope.currentPage = _getDefaultPage();
        angular.forEach($scope.gameModel, function(value, key) {
            $scope.gameModel[key] = '';
        });
    }

    _init();

}]);
