/*  Title: Dashboard Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the Dashboard page.
*/

app.controller('DashboardCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    $scope.user_model = {username: 'anonymous'};
    var _init = function() {
        if (typeof 'undefined' != data && data.user){
            $scope.user_model = data.user;
        }
    };

    _init();

}]);
