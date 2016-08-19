/*  Title: Login Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the login page.
*/

app.controller('loginCtrl', ['$scope', function($scope) {
    $scope.testInput = null;
    $scope.init = function(value) {
        console.log('here');
        $scope.testInput= value;
    };

    $scope.onSubmit = function(){
    	console.log(arguments);
    };

}]);
