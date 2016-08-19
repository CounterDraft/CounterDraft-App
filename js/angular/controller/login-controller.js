/*  Title: Login Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the login page.
*/

app.controller('loginCtrl', ['$scope, $http', function($scope, $http) {

    $scope.init = function(name, id) {
        $scope.id = id;
        $scope.name = name;
    };

    $scope.onSubmit = function(){
    	console.log(arguments);
    };

}]);
