/*  Title: Profile/ My Account Controller
    Author:  Hubbert
    Date: Oct 15 2016
    Comment: 
        This should all the front end logic for the my account page.
*/

app.controller('ProfileCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/account/";
    var _url_employee = "/api/v1/user/";

    $scope.currentPage = null;
    $scope.timeSelect = null;
    $scope.editForm = null;
    $scope.showEdit = null;
    $scope.employeeModel = {
        id: null,
        first_name: null,
        last_name: null,
        email_address: null,
        organization_id: null
    }
    $scope.organizationModel = {
        description: null,
        id: null,
        name: null
    }

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initAccount = function() {
        $scope.editForm = false;
        $scope.showEdit = true;
        var userNotFoundErrorMsg = "An unexpected error has occuried. Please contact CounterDraft support..";

        if (typeof 'undefined' != data && data.hasOwnProperty('employee')) {
            $scope.employeeModel.id = data.employee.id;
        }

        if ($scope.employeeModel.id) {
            $http({
                method: 'GET',
                url: _url_employee,
                params: {id:$scope.employeeModel.id},
            }).then(function successCallback(response) {
                if (response && response.status === 200) {
                    var employee = response.data.employee;
                    var organization = response.data.organization;
                    if(employee){
                        $scope.employeeModel = employee;
                    }
                    if(organization){
                        $scope.organizationModel = organization;
                    }
                } else {
                    $window.swal({
                        title: "Error",
                        text: userNotFoundErrorMsg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                    $scope.showEdit = false;
                }
            }, function errorCallback(response) {
                var errorMsg = userNotFoundErrorMsg;
                if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('error') && response.data.error.length > 0) {
                    errorMsg = response.data.error[0].msg;
                }
                $window.swal({
                    title: "Error",
                    text: errorMsg,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
                $scope.showEdit = false;
            });
        } else {
            $window.swal({
                title: "Error",
                text: userNotFoundErrorMsg,
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
            $scope.showEdit = false;
        }
    }

    this.onEdit = function() {
        $scope.editForm = !$scope.editForm;
        return false;
    }

    this.getEmployeeImage = function() {

    }

    var _getDefaultPage = function() {
        return _base_templates + 'account.html';
    }

    _init();

}]);
