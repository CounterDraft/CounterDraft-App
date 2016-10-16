"use strict";
/*  Title: Game-api
    Author:  Hubbert
    Date: Oct 11 2016
    Comment: 
        This is the api which is used for the game section.
*/

function GameApi() {
    this.tag = 'game-api';
    var Promise = getPromise();
    var ModelGame = models.game;

    this.getTotalGame = function(req, res) {
        var self = this;
        var organization = this.getOrganization(req, res);
        ModelGame.findAndCountAll({
            where: {
                organization_id: organization.id,
                is_active: true
            }
        }).then(function(results) {
            res.status(200).json({
                total: results.count,
                success: true
            });
        }).catch(function(err) {
            self.getErrorApi().setErrorWithMessage(err.toString(), 500, res);
        });
    }

    this.create = function(req, res) {
        var self = this;
        var organization = self.getOrganization(req, res);
        res.status(200).json({
            success: true
        });
    }
}

module.exports = GameApi;
