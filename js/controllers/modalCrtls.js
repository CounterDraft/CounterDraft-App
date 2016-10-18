/*  Title: Modal Controller
    Author:  Hubbert
    Date: Oct 18 2016
    Comment: 
        All modal ctrls should go in this file.
*/

app.controller('ChangePasswordCtrl', ['$scope', '$uibModalInstance', 'data', function($scope, $uibModalInstance, data) {

    this.initChangePasswordModal = function() {
        console.log('init change password modal');
    }

    this.cancel = function() {
        console.log('cancelled button clicked.');
         $uibModalInstance.dismiss('cancel');
    }

    // this.cancel = function() {
    //     console.log('herer');
       
    //     return false;
    // }

    this.onSubmit = function() {
        console.log('submit button has been pressed!');
    }

}]);
