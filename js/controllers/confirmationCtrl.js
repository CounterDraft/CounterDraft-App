/*  Title: Reports Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the report page.
*/

app.controller('ConfirmationCtrl', ['$scope', '$window', 'data', function($scope, $window, data) {
    $scope.userData = {};
    $scope.showError = false;

    var _init = function() {
        var self = this;
        if(data.hasOwnProperty('error')){
            $scope.userData.errorMessage = data.error[0].msg;
            $scope.showError = true;
        }else{
            console.log(data);
           $scope.userData.email_address = data.email_address; 
        }
    };

    _init();

}]);
