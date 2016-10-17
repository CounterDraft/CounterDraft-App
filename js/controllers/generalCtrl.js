/*  Title: General Controller
    Author:  Hubbert
    Date: September 23 2016
    Comment: 
        This is a controller that is not used for anything special.
*/

app.controller('GeneralCtrl', ['$scope','data', function($scope, data) {
    var self = this;
    $scope.user_model = {};
    $scope.path = '';
    var _init = function() {
        if (typeof 'undefined' != data) {
            $scope.user_model = data.user || {};
            $scope.path =  data.path || 'dashboard';
        }
    }

    _init();

}]);
