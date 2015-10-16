"use strict"; //Defines that JavaScript code should be executed in "strict mode".
var title = 'dashboard';

$(document).ready(function() {

});

var counterApp = angular.module('counterApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        // 
        // For any unmatched url, redirect to /state1 
        $urlRouterProvider.otherwise("/state1");
        // 
        // Now set up the states 
        $stateProvider
            .state('state1', {
                url: "/",
                templateUrl: "partials/state1.html"
            })
            .state('state1.list', {
                url: "/list",
                templateUrl: "partials/state1.list.html",
                controller: function($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "partials/state2.html"
            })
            .state('state2.list', {
                url: "/list",
                templateUrl: "partials/state2.list.html",
                controller: function($scope) {
                    $scope.things = ["A", "Set", "Of", "Things"];
                }
            });
    });
