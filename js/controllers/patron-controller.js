/*  Title: Patron Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the patron page.
*/

app.controller('PatronCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/patron/";
    var _url_patron = "/api/v1/patron/";
    $scope.currentPage = null;

    //models
    $scope.patronModel = {
        first_name: null,
        last_name: null,
        email_address: null,
        username: null,
        patron_organization: null
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

    $scope.onPatronSearch = function() {
        var formData = $scope.patronModel;
        var hasData = false;

        for (var x in formData) {
            if (formData[x]) {
                hasData = true;
            }
        }

        if (hasData) {
            //GET call to backend;
            $http({
                method: 'GET',
                url: _url_patron,
                params: formData,
            }).then(function successCallback(response) {
                console.log(response);
                //show message to check your email.
            }, function errorCallback(response) {
                console.error(response);
            });
        }
    }

    var _getDefaultPage = function() {
        return _base_templates + 'patron.html';
    }

    _init();

}]);
