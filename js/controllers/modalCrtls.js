/*  Title: Modal Controller
    Author:  Hubbert
    Date: Oct 18 2016
    Comment: 
        All modal ctrls should go in this file.
*/
app.controller('ChangePasswordCtrl', ['$scope', '$http', '$window', '$uibModalInstance', 'data', function($scope, $http, $window, $uibModalInstance, data) {
    var _url_user_password = "/api/v1/user/password";
    $scope.passwordModel = {
        password: null,
        password_confirm: null
    }

    this.initChangePasswordModal = function() {
        //nothing;
    }

    this.cancel = function() {
        $uibModalInstance.dismiss('cancel');
        return false;
    }

    this.onSubmit = function() {
        var self = this;
        var formData = $scope.passwordModel;
        var hasData = true;

        var errorMsg = 'Unknown error failed to update password.';

        for (var x in formData) {
            if (!formData[x]) {
                hasData = false;
            }
        }

        if (hasData) {
            errorMsg = "Password and password confirm do not match.";
            if (formData.password !== formData.password_confirm) {
                $window.swal({
                    title: "Error",
                    text: errorMsg,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
                return;
            }
            $http({
                method: 'PUT',
                url: _url_user_password,
                data: formData,
            }).then(function successCallback(response) {
                if (response && response.status === 200) {
                    var msg = 'Your password has been changed.';
                    $window.swal({
                        title: "Success",
                        text: msg,
                        type: "success",
                        confirmButtonColor: "#64d46f",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    }, function() {
                        $scope.passwordModel = null;
                        $scope.changePasswordForm.$setPristine();
                        $scope.changePasswordForm.$setUntouched();
                        $scope.$apply();
                        $scope.$broadcast('show-errors-reset');
                        $uibModalInstance.dismiss('cancel');
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
}]).controller('AddAddressCtrl', ['$scope', '$http', '$window', '$uibModalInstance', 'data', function($scope, $http, $window, $uibModalInstance, data) {

    this.initAddAddressModal = function() {
        //nothing to add?
    }

    this.cancel = function() {
        $uibModalInstance.dismiss('cancel');
        return false;
    }

    this.onAddress = function(error, place) {
        var simplePlace = {};
        if (error) {
            $window.swal({
                title: "Error",
                text: error.toString(),
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
            return;
        }
        address_com_arr = place.address_components;
        angular.forEach(address_com_arr, function(value, key) {
            if (value.hasOwnProperty('types') && value.types.length > 0) {
                simplePlace[value.types[0]] = value.long_name;
            }
        });
        simplePlace.id = place.id;
        $uibModalInstance.close(simplePlace);
         return false;
    }


}]);
