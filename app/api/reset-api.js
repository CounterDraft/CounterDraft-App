"use strict";

function ResetApi() {
    this.tag = 'reset-api';

    this.resetUsernamePassword = function(req, res) {
        if (!req.body.username && !req.body.email_address) {
            this.getErrorApi().sendError(1010, 400, res);
        }

        res.status(200).json({
            username: req.body.username,
            email_address: req.body.email_address,
            success: true
        });
    }
}

module.exports = ResetApi;
