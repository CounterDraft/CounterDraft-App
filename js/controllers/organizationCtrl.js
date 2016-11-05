/*  Title: Organization settings Controller
    Author:  Hubbert
    Date: Nov 03 2016
    Comment: 
        This should all the front end logic for the my organization settings page.
*/

app.controller('OrganizationCtrl', ['$scope', '$uibModal', '$http', '$anchorScroll', '$window', 'data', function($scope, $uibModal, $http, $anchorScroll, $window, data) {
    var _base_templates = "templates/organization/";
    var _url_organization = "/api/v1/organization";

    $scope.previousPage = null;
    $scope.currentPage = null;

    $scope.organizationModel = null;
    $scope.showEdit = true;

    $scope.organization_types = [];

    this.animationsEnabled = true;

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
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
                if (response.data && response.data.hasOwnProperty('organization')) {
                    $scope.organizationModel = response.data.organization;
                    console.log(response.data.organization);
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

    this.initAddEmpoyee = function(){
        //nothing
    }

    this.initOrganization = function() {
        //nothing
    }
    
    $scope.onBack = function() {
        _preRoute();
        $scope.currentPage = $scope.previousPage;
        _postRoute();
    }

    $scope.onRoute = function(page) {
        _preRoute();
        if (page) {
            $scope.previousPage = $scope.currentPage;
            $scope.currentPage = _base_templates + page + '.html';
        }
        _postRoute();
    }

    this.saveForm = function(){
        var organization = angular.copy($scope.organizationModel);
        console.log(organization);
    }

    this.onAddEmployee = function() {
        $scope.onRoute('add-employee');
    }

    var _preRoute = function() {

    }

    var _postRoute = function() {
        $anchorScroll();
    }

    var _getDefaultPage = function() {
        return _base_templates + 'organization.html';
    }

    _init();

}]);
