/*  Title: application bootstrap
    Author:  Hubbert
    Date: Aug 16 2016
    Comment:  
        To start the applicaiton and setup the router if needed.
        Filter should be placed here and other comment app related stuff.
*/

app = angular.module('CounterDraft-app', ['angular.morris', 'ui.bootstrap.showErrors'])
    .config(['showErrorsConfigProvider', function(showErrorsConfigProvider) {
        showErrorsConfigProvider.showSuccess(true);
    }]);
