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
        password: null,
        password_confirm: null,
        organization_name: null,
        organization: null
    };

    $scope.patronSearchModel = {
        patron_id: null,
        first_name: null,
        last_name: null,
        email_address: null
    };

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
        if(typeof 'undefined' != data && data.hasOwnProperty('organization')){
            $scope.patronModel.organization_name = data.organization.name;
            $scope.patronModel.organization = data.organization.id;
        }
    };

    $scope.patronSearchFormValue = function(){
        var is_good = true;
       for(var x in $scope.patronSearchModel){
            if($scope.patronSearchModel[x]){
                is_good = false;
            }
       }
       return is_good;
    };

    $scope.onRoute = function(page) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
        angular.forEach($scope.patronSearchModel, function(value, key) {
            $scope.patronSearchModel[key] = null;
        });
    };

    $scope.onClose = function() {
        $scope.currentPage = _getDefaultPage();
        angular.forEach($scope.patronModel, function(value, key) {
            if(key.match(/organization/g)){
                return;
            }
            $scope.patronModel[key] = null;
        });
    };

    $scope.onPatronSearch = function() {
        var formData = $scope.patronSearchModel;
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

    $scope.onPatronRegistration = function(){
        var formData = $scope.patronModel;
        var hasData = true;

        for (var x in formData) {
            if (!formData[x]) {
                hasData = false;
            }
        }

        //POST create patron;
        if (hasData) {
            $http({
                method: 'POST',
                url: _url_patron,
                data: formData,
            }).then(function successCallback(response) {
                console.log(response);
                //show message to check your email.
            }, function errorCallback(response) {
                console.error(response);
            });
        }else{
            console.error('Missing data in form.')
        }
    }

    var _getDefaultPage = function() {
        return _base_templates + 'patron.html';
    }

    _init();

}]);
