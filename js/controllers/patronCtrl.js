/*  Title: Patron Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the patron page.
*/

app.controller('PatronCtrl', ['$scope', '$http', '$window', '$uibModal', '$anchorScroll', 'data', function($scope, $http, $window, $uibModal, $anchorScroll, data) {
    var _base_templates = "templates/patron/";
    var _url_patron = "/api/v1/patron/";
    var _url_patron_search = "/api/v1/patron/search/";
    $scope.allowEdit = null;
    $scope.prevPage = null;
    $scope.currentPage = null;
    $scope.image_dir = '/';
    $scope.image_bucket_url = null;
    $scope.minAge = 18;
    $scope.searchArr = [];
    $scope.addressArr = [];
    $scope.admin = false;
    this.animationsEnabled = true;

    //models
    $scope.patronModel = {
        first_name: null,
        last_name: null,
        email_address: null,
        password: null,
        password_confirm: null,
        organization_name: null,
        organization: null,
        dob: null,
        phone: null
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
    }

    this.initSearch = function() {
        //nothing;
    }

    this.initResults = function() {
        if (typeof 'undefined' != data && data.hasOwnProperty('dir')) {
            if (data.dir.hasOwnProperty('image_dir')) {
                $scope.image_dir = data.dir['image_dir'];
            }
            if (data.dir.hasOwnProperty('image_bucket_url')) {
                $scope.image_bucket_url = data.dir['image_bucket_url'];
            }
        }
    }

    this.initAddPatron = function() {
        var today = new Date();
        if (typeof 'undefined' != data && data.hasOwnProperty('organization')) {
            $scope.patronModel.organization_name = data.organization.name;
            $scope.patronModel.organization = data.organization.id;
        }
        $scope.minAge = new Date(today.getFullYear() - $scope.minAge, today.getMonth(), today.getDate());
    }

    this.initDetails = function() {
        $scope.allowEdit = false;
        $scope.patronModel.password = 'placeholder';
        if (typeof 'undefined' != data && data.hasOwnProperty('dir')) {
            if (data.hasOwnProperty('employee')) {
                $scope.admin = data.employee.is_admin;
            }
        }
    }

    this.removeAddress = function(index, form) {
        if (form === 'details') {
            var patron = angular.copy($scope.patronModel);
            var address = angular.copy($scope.addressArr[index]);
            var patronAddress = {}
            angular.forEach(address, function(value, key) {
                patronAddress[key] = null;
            });
            patronAddress.id = patron.id;
            $http({
                method: 'PUT',
                url: _url_patron,
                data: patronAddress,
            }).then(function successCallback(response) {
                    if (response.hasOwnProperty('data') && response.data.patron) {
                        var patron = response.data.patron;
                        if (!patron.hasOwnProperty('address')) {
                            delete $scope.patronModel['address'];
                        }
                    }
                },
                function errorCallback(response) {
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
                    }
                });
        }
        $scope.addressArr.splice(index, 1);
    }

    this.onAddAddress = function(form) {
        var self = this;
        var modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'add-address-modal.html',
            controller: 'AddAddressCtrl',
            controllerAs: 'mCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function(place) {
            $scope.addressArr.push(place);
            if (form === 'details') {
                var patron = angular.copy($scope.patronModel);
                var formData = {
                    id: patron.id,
                    street_number: place.street_number,
                    route: place.route,
                    locality: place.locality,
                    administrative_area_level_1: place.administrative_area_level_1,
                    administrative_area_level_2: place.administrative_area_level_2,
                    country: place.country,
                    postal_code: place.postal_code,
                }
                $http({
                    method: 'PUT',
                    url: _url_patron,
                    data: formData,
                }).then(function successCallback(response) {
                    if (response && response.hasOwnProperty('data')) {
                        //nothing;
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
                    }
                });
            }
        }, function() {
            console.info('Modal dismissed at: ' + new Date());
        });
    }

    this.onPatronSelected = function(patron) {
        $scope.addressArr.length = 0;
        if (patron.hasOwnProperty('address')) {
            $scope.addressArr.push(patron.address);
        }
        $scope.patronModel = patron;
        $scope.onRoute('patron-details', true);
    }

    this.getProfileImageUrl = function(uuid) {
        if (!uuid) {
            // return $scope.image_dir + 'blue-person-plceholder.svg';
            return $scope.image_bucket_url + 'default.png';
        }
        return $scope.image_bucket_url + 'employee/' + uuid + '-profile.png';
        // check for image in s3;
        // return the image_url to front-end;
    }

    var _clearModel = function(modalName) {
        if (!$scope[modalName]) {
            return;
        }
        angular.forEach($scope[modalName], function(value, key) {
            if (key.match(/organization/g)) {
                return;
            }
            $scope[modalName][key] = null;
        });
    }

    var _resetForm = function(form, modelName) {
        _clearModel(modelName);
        form.$setPristine();
        form.$setUntouched();
        $scope.$broadcast('show-errors-reset');
    }

    $scope.patronSearchFormValue = function() {
        var is_good = true;
        for (var x in $scope.patronSearchModel) {
            if ($scope.patronSearchModel[x]) {
                is_good = false;
            }
        }
        return is_good;
    }

    $scope.onRoute = function(page, doNotClear) {
        $scope.prevPage = $scope.currentPage;
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
        if (!doNotClear) {
            _clearModel('patronSearchModel');
            _clearModel('patronModel');
            $scope.addressArr = [];
        }
        $anchorScroll();
    }

    $scope.onBack = function(page) {
        if(page === 'details'){
            _clearModel('patronModel');
        }
        if ($scope.prevPage) {
            $scope.currentPage = $scope.prevPage;
        }
    }

    $scope.onEdit = function() {
        $scope.allowEdit = !$scope.allowEdit;
    }

    $scope.onPatronSearch = function() {
        var self = this;
        var formData = angular.copy($scope.patronSearchModel);
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
                url: _url_patron_search,
                params: formData,
            }).then(function successCallback(response) {
                if (response && response.hasOwnProperty('data') && response.data.patrons.length > 0) {
                    var patrons = []
                    angular.forEach(response.data.patrons, function(value, key) {
                        var patron = value;
                        if (patron.dob) {
                            patron.dob = moment.unix(patron.dob).toDate();
                        }
                        if (patron.phone) {
                            patron.phone = parseInt(patron.phone);
                        }
                        patrons.push(patron);
                    });
                    $scope.searchArr = patrons;
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
        } else {
            $window.swal({
                title: "Error",
                text: "Missing required field!",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
        }
    }

    $scope.onPatronRegistration = function() {
        var self = this;
        var formData = angular.copy($scope.patronModel);
        var addressArr = angular.copy($scope.addressArr);
        var hasData = true;

        //dob to ISO 86 string;
        if (formData.hasOwnProperty('dob') && formData.dob) {
            formData.dob = moment(formData.dob).format();
        }

        if (formData.hasOwnProperty('phone') && formData.phone && formData.phone.toString().length === 10) {
            var p = 1 + formData.phone.toString();
            formData.phone = p;
        }
        if (addressArr.length > 0) {
            formData.address = addressArr[0];
        }

        for (var x in formData) {
            // address is a none required field
            if (!formData[x] && x !== 'phone' && x !== 'address') {
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
                var data = response.data.user || null;
                var msg = data.first_name + ' ' + data.last_name + ' has been registration. The patron can now log in with their email address.';

                $window.swal({
                    title: "Success",
                    text: msg,
                    type: "success",
                    confirmButtonColor: "#64d46f",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                }, function() {
                    $scope.onRoute('patron-details', true);
                    $scope.$apply();
                });
                // _resetForm(self.addPatronForm, 'patronModel');

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
                    }, function() {
                        //callback
                    });
                }
            });
        } else {
            $window.swal({
                title: "Error",
                text: "Missing required field!",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
        }
    }

    this.saveForm = function() {
        var userNotFoundErrorMsg = "An unexpected error has occuried. Please contact CounterDraft support..";
        var patron = angular.copy($scope.patronModel);

        var formData = {
            id: patron.id,
            dob: patron.dob,
            email_address: patron.email_address,
            first_name: patron.first_name,
            last_name: patron.last_name,
            phone: patron.phone
        }
        if (formData.phone && formData.phone.toString().length === 10) {
            var p = 1 + formData.phone.toString();
            formData.phone = p;
        }
        if (formData) {
            $http({
                method: 'PUT',
                url: _url_patron,
                data: formData,
            }).then(function successCallback(response) {
                if (response && response.status === 200) {
                    // console.log(response);
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
                if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('error') && response.data.error.length > 0) {
                    errorMsg = response.data.error[0].msg;
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
        }
    }

    this.onEditPassword = function(allowEdit) {
        var self = this;
        if (!allowEdit) {
            return false;
        }
        var modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'patron-password-modal.html',
            controller: 'PatronPasswordCtrl',
            controllerAs: 'mCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function(result) {
            if (result.status) {
                $window.swal({
                    title: "Success",
                    text: 'Patron passsword has been changed.',
                    type: "success",
                    confirmButtonColor: "#64d46f",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                });
            } else {
                var errorMsg = 'Unknown error failed to update password.';
                if (result.hasOwnProperty('errorMsg')) {
                    errorMsg = result.errorMsg;
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
            }
        }, function() {
            console.info('Modal dismissed at: ' + new Date());
        });
    }

    this.onDelete = function() {
        var patron = angular.copy($scope.patronModel);
        var verbage = patron.first_name + ' ' + patron.last_name + ' will be gone forever!';
        $window.swal({
                title: "Are you sure want to delete this patron?",
                text: verbage,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Delete",
                closeOnConfirm: false
            },
            function(isConfirm) {
                if (!isConfirm) {
                    return;
                }

                $http({
                    method: 'DELETE',
                    url: _url_patron,
                    params: {id: patron.id},
                }).then(function successCallback(response) {
                    if (response && response.hasOwnProperty('data') && response.data.patron) {
                        var patron = response.data.patron;
                        var msg = patron.first_name + ' ' + patron.last_name + ' has been deleted from the organization';
                        $window.swal({
                            title: "Success",
                            text: msg,
                            type: "success",
                            confirmButtonColor: "#64d46f",
                            confirmButtonText: "OK",
                            closeOnConfirm: true,
                            html: true
                        }, function() {
                            $scope.$broadcast('show-errors-reset');
                            $scope.onRoute('patron');
                            $scope.$apply();
                        });
                    }
                }, function errorCallback(response) {
                    var data = response.data || null;
                    if (data && data.hasOwnProperty('error') && data.error.length > 0) {
                        var error = data.error[0];
                        swal({
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
            });
    }

    var _getDefaultPage = function() {
        return _base_templates + 'patron.html';
    }

    _init();

}]);
