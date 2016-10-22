/*  Title: application bootstrap
    Author:  Hubbert
    Date: Aug 16 2016
    Comment:  
        To start the applicaiton and setup the router if needed.
        Filter should be placed here and other comment app related stuff.
*/

app = angular.module('CounterDraft-app', [
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'angular.morris',
        'ui.bootstrap.showErrors',
        'ngPlacesAutocomplete'
    ])
    .config(['showErrorsConfigProvider', function(showErrorsConfigProvider) {
        showErrorsConfigProvider.showSuccess(true);
    }]);
