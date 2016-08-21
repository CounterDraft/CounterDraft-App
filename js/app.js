/*  Title: application bootstrap
    Author:  Hubbert
    Date: Aug 16 2016
    Comment:  
        To start the applicaiton and setup the router if needed.
        Filter should be placed here and other comment app related stuff.
*/

app = angular.module('CounterDraft-app', [])
    .factory('httpRequestInterceptor', function() {
        return {
            request: function(config) {

                // use this to destroying other existing headers
                // config.headers = { 'Content-Type': 'application/x-www-form-urlencoded','Cache-Control': 'no-cache'};

                // use this to prevent destroying other existing headers
                // config.headers['Accept'] = '*/*';
                // config.headers['Cache-Control'] = 'no-cache';
                return config;
            }
        };
    }).config(function($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    });
