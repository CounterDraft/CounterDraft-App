/*  Title: application bootstrap
    Author:  Hubbert
    Date: Aug 16 2016
    Comment:  
        To start the applicaiton and setup the router if needed.
        Filter should be placed here and other comment app related stuff.
*/

app = angular.module('CounterDraft-app', [
        'ui.bootstrap',
        'angular.morris',
        'ui.bootstrap.showErrors',
        'ngPlacesAutocomplete',
        'ui.toggle'
    ])
    .config(['showErrorsConfigProvider', '$locationProvider', function(showErrorsConfigProvider, $locationProvider) {
        showErrorsConfigProvider.showSuccess(true);
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
