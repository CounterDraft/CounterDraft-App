/*  Title: Modal Controller
    Author:  Hubbert
    Date: Oct 18 2016
    Comment: 
        All modal ctrls should go in this file.
*/

app.controller('ChangePasswordCtrl', ['$scope', '$uibModalInstance', 'data', function($scope, $uibModalInstance, data) {

    this.initChangePasswordModal = function() {
        console.log('hreerer');
    }

    this.cancel = function() {
        console.log("asasdsd");
    }

    this.cancel = function() {
        console.log('herer');
        $uibModalInstance.dismiss('cancel');
        return false;
    }

    this.onSubmit = function() {
        console.log('here');
    }

}]);
