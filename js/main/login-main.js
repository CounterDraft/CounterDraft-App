"use strict"; //Defines that JavaScript code should be executed in "strict mode".
var title = 'login';

$(document).ready(function() {
    $('a.active-reset').on('click', function(event) {
        $('div.retrieve-container').toggleClass('active');
    });
});

//TODO: bring in a common module all pages can share.
var myApp = angular.module('loginApp', [])
    .controller('loginController', ['$scope',function($scope) {
        $scope.formData = {};
        $scope.retdata = {};
        //button click;
        $scope.onClick = function() {
                return false;
            }
            // process the form
        $scope.onSubmit = function(type) {
            switch (type) {
                case 'login-form':
                    console.log($scope.formData);
                    break;
                case 'retrieve-form':
                    console.log($scope.retdata);
                    break;
                default:
                    console.error('Error: Missing argument!');
                    break;
            }
            return false;
        }
    }]);
