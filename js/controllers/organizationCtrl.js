/*  Title: Organization settings Controller
    Author:  Hubbert
    Date: Nov 03 2016
    Comment: 
        This should all the front end logic for the my organization settings page.
*/

app.controller('OrganizationCtrl', ['$scope', '$uibModal', '$http', '$window', 'data', function($scope, $uibModal, $http, $window, data) {
    var _base_templates = "templates/organization/";
    var _url_organization = "/api/v1/organization";

    $scope.previousPage = null;
    $scope.currentPage = null;

    $scope.organization = null;
    $scope.showEdit = true;

    $scope.organization_types = [];

    this.animationsEnabled = true;

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initOrganization = function() {
        $('[data-toggle="toggle"]').bootstrapToggle();

        if (typeof 'undefined' != data && data.organization_types) {
            $scope.organization_types = data.organization_types;
        }

        if (typeof 'undefined' != data && data.organization) {
            var formData = null;
            $http({
                method: 'GET',
                url: _url_organization,
                param: formData,
            }).then(function successCallback(response) {
                if(response.data && data.hasOwnProperty('organization')){
                    $scope.organization = data.organization;
                }
            }, function errorCallback(response) {
                var message = 'An unexpected error has occuried!';

                if (typeof 'undefined' != response &&
                    response.hasOwnProperty('data') &&
                    response.data.error.length > 0) {
                    message = response.data.error[0].msg;
                }
                $window.swal({
                    title: "Error",
                    text: message,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
            });
        }
    }

    var _getDefaultPage = function() {
        return _base_templates + 'organization.html';
    }

    _init();

}]);
