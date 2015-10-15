"use strict"; //Defines that JavaScript code should be executed in "strict mode".
var title = 'login';

$(document).ready(function() {
    $('a.active-reset').on('click', function(event) {
        $('div.retrieve-container').toggleClass('active');
    });
});

//TODO: bring in a common module all pages can share.
var myApp = angular.module('loginApp', [])
    .controller('loginController', ['$scope', '$http', function($scope, $http) {
        $scope.formData = {};
        $scope.retdata = {};

        // process the form
        var submitForm = function(data, url) {
            $http({
                method: 'POST',
                url: url,
                data: $.param(data), // pass in data as strings
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } // set the headers so angular passing info as form data (not request payload)
            }).then(function successCallback(res) {
                if (!res.data.success) {
                    $scope.errorName = res.data.errors[0].msg;
                } else {
                    Counter.message.showMessage('Welcome back, Jerum Hubbert', 'success');
                    window.location.replace("/dashboard");
                }
            }, function errorCallback(res) {
                console.log(res.data);
                Counter.message.showMessage(res.data.error[0].msg, 'danger');
            });
        }

        var loginProcess = function(username, paswrd) {
            if ((!username || username === '') || (!email || email === '')) {
                return false;
            }
            submitForm({
                username: username,
                password: paswrd
            }, '/api/account/login/');
        }

        var retrieveLoginProcess = function(username, email) {
                if ((!username || username === '') && (!email || email === '')) {
                    return false;
                }
                console.log('submitting data for retrieve');
                submitForm({
                    username: username,
                    email: email
                }, '/api/account/recover');
            }
            //button click;
        $scope.onClick = function() {
                return false;
            }
            // process the form
        $scope.onSubmit = function(type) {
            switch (type) {
                case 'login-form':
                    loginProcess($scope.formData.username, $scope.formData.password);
                    break;
                case 'retrieve-form':
                    retrieveLoginProcess($scope.formData.username, $scope.formData.email);
                    break;
                default:
                    console.error('Error: Missing argument!');
                    break;
            }
            return false;
        }

    }]);
