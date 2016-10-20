/*  Title: Patron Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the patron page.
*/

app.controller('PatronCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
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

    //models
    $scope.patronModel = {
        first_name: null,
        last_name: null,
        email_address: null,
        password: null,
        password_confirm: null,
        organization_name: null,
        organization: null,
        dob: null
        address: {
            street_number: null,
            route: null,
            locality: null,
            administrative_area_level_2: null,
            administrative_area_level_1: null,
            country: null,
            postal_code: null
        }
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
    }

    this.onPatronSelected = function(patron) {
        $scope.patronModel.first_name = patron.first_name;
        $scope.patronModel.last_name = patron.last_name;
        $scope.patronModel.email_address = patron.email_address;
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
        }
    }

    $scope.onBack = function(page) {
        if ($scope.prevPage) {
            $scope.currentPage = $scope.prevPage;
        }
    }

    $scope.onEdit = function() {
        $scope.allowEdit = !$scope.allowEdit;
    }

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
                url: _url_patron_search,
                params: formData,
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
    }

    $scope.onPatronRegistration = function() {
        var self = this;
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
            console.error('Missing data in form.')
        }
    }

    var _getDefaultPage = function() {
        return _base_templates + 'patron.html';
    }

    _init();

}]);
