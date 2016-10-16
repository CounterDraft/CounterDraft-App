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
    $scope.employeeModal = {
        id: null,
        first_name: null,
        last_name: null,
        email_address: null,
        password: null,
        password_confirm: null,
        organization_name: null,
        organization_type: null,
        organization_description: null,
        organization_hash: null
    }

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
        $scope.employeeModal.id = 1229;
    }

    this.initAccount = function() {
        var employee_id = $scope.employeeModal.id;

        //get the employee
        $http({
            method: 'GET',
            url: _url_employee,
            params: employee_id,
        }).then(function successCallback(response) {
            var data = null;
            if (response && response.hasOwnProperty('data') && response.data.patrons.length > 0) {
                $scope.searchArr = response.data.patrons;
                $scope.onRoute('patron-results', true);
            } else {
                $window.swal({
                    title: "results",
                    text: "No patrons found.",
                    type: "info",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
            }
        }, function errorCallback(response) {
            var data = response.data || null;
            if (data && data.error.length > 0) {
                var error = data.error[0];
                $window.swal({
                    title: "Error",
                    text: error.msg,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
            } else {
                console.error(response);
            }
        });
    }

    var _getDefaultPage = function() {
        return _base_templates + 'account.html';
    }

    _init();

}]);
