/*  Title: Retrieve Controller
    Author:  Hubbert
    Date: Oct 31 2016
    Comment: 
        This should all the logic for the retrieve page.
*/

app.controller('RetrieveCtrl', ['$scope', '$http', '$location', '$window', 'data', function($scope, $http, $location, $window, data) {
    var _base_templates = "templates/retrieve/";
    $scope.prevPage = null;
    $scope.currentPage = null;

    $scope.recoverModel = {
        password: null,
        password_confirm: null,
        retrieve_token: null
    }

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initPasswordRecovery = function() {
        if (typeof 'undefined' != data) {
        }
        if($location.search().retrieve_token){
            // $scope.recoverModel.retrieve_token = 
            console.log($location.search());
        }
    }

    var _getDefaultPage = function() {
        return _base_templates + 'retrieve.html';
    }

    this.onBack = function() {
        $scope.currentPage = $scope.prevPage;
    }

    this.onClose = function() {
        $scope.currentPage = $scope.prevPage;
    }

    this.onSubmit = function() {
        //nothing;
    }

    _init();

}]);
