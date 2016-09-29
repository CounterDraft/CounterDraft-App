"use strict";
/*  Title: Patron-api
    Author:  Hubbert
    Date: Sep 28 2016
    Comment: 
        This is the api which is used for all patron search and create logic.
*/

function PatronApi() {
    this.tag = 'patron-api';
    var Promise = getPromise();
    var ModelPatron = models.patron_player;

    this.getPatron = function(req, res) {
        var self = this;
        console.log(req.query);
        new Promise(function(resolve, reject) {
            return resolve(true);

        }).then(function(result) {
            res.status(200).json({
                success: true
            });
        });
    }
}

module.exports = PatronApi;
