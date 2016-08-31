/*  Title: Patron Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the patron page.
*/

app.controller('PatronCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/patron/";
    $scope.currentPage = null;

    //models
    $scope.patronModel = {
        first_name: '',
        last_name: '',
        email_address: '',
        password: '',
        password_confirm: '',
        organization_name: '',
        organization_type: '',
        organization_description: '',
        organization_hash: ''
    };
    
    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    };

    $scope.onRoute = function(page) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
    };

    $scope.onClose = function() {
        $scope.currentPage = _getDefaultPage();
        angular.forEach($scope.patronModel, function(value, key) {
            $scope.patronModel[key] = '';
        });
    };

    var _getDefaultPage = function() {
        return _base_templates + 'patron.html';
    }

    _init();

}]);
