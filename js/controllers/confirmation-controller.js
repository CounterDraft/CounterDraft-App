/*  Title: Reports Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the report page.
*/

app.controller('ConfirmationCtrl', ['$scope', '$window', 'data', function($scope, $window, data) {
    var _base_templates = "templates/reports/";
    $scope.currentPage = null;
    
    var _init = function() {
        //default page;
    };

    _init();

}]);
