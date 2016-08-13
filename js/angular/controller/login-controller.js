/*  Title: Login Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the login page.
*/

angular.module('CounterDraft-app')
.controller('loginCtrl', ['$scope', function($scope) {

    $scope.Hello = "Hello application";

    $scope.init = function() {
        console.log('here we are');
    }


}]);
