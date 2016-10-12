"use strict";
/*  Title: Reset-api
    Author:  Hubbert
    Date: Oct 11 2016
    Comment: 
        This is the api which is used for all reseting stuff all logic should be here.
*/

function ResetApi() {
    this.tag = 'reset-api';
    var self = this;
    var Promise = getPromise();
    var ModelEmployee = models.employee_user;
    var ModelPatron = models.patron_player;

    this.resetUsernamePassword = function(req, res) {

        if (!req.body.email_address) {
            this.getErrorApi().sendError(1010, 400, res);
            return;
        }

        res.status(200).json({
            username: req.body.username,
            email_address: req.body.email_address,
            success: true
        });
    }
}

module.exports = ResetApi;
