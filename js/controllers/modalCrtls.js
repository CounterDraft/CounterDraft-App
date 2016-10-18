/*  Title: Modal Controller
    Author:  Hubbert
    Date: Oct 18 2016
    Comment: 
        All modal ctrls should go in this file.
*/

app.controller('ChangePasswordCtrl', ['$scope', '$http','$window','$uibModalInstance', 'data', function($scope, $http, $window, $uibModalInstance, data) {
    var _url_user_password = "/api/v1/user/password";
    $scope.passwordModel = {
        password: null,
        password_confirm: null
    }

    this.initChangePasswordModal = function() {

    }

    this.cancel = function() {
        $uibModalInstance.dismiss('cancel');
        return false;
    }

    this.onSubmit = function() {
        var self = this;
        var formData = $scope.resetModal;
        var hasData = true;

        var errorMsg = 'Unknown error failed to update password.';

        for (var x in formData) {
            if (!formData[x]) {
                hasData = false;
            }
        }

        if (hasData) {
            $http({
                method: 'PUT',
                url: _url_user_password,
                data: formData,
            }).then(function successCallback(response) {
                if (response && response.status === 200) {
                    console.log(response);
                } else {
                    $window.swal({
                        title: "Error",
                        text: errorMsg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    });
                }
            }, function errorCallback(response) {
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
            });
        } else {
            $window.swal({
                title: "Error",
                text: errorMsg,
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
        }
    }
}]);
