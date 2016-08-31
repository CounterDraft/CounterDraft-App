/*  Title: Reports Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the report page.
*/

app.controller('ReportsCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/reports/";
    $scope.currentPage = null;
    
    var _init = function() {
        //default page;
    };

    $scope.onShowReport = function(reportName) {
        if (reportName) {
            $scope.currentPage = _base_templates + reportName + '.html';
        }
    };

    $scope.onClose = function() {
        $scope.currentPage = null;
    };

    _init();

}]);
