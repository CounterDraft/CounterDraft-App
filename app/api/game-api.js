"use strict";
/*  Title: Game-api
    Author:  Hubbert
    Date: Oct 11 2016
    Comment: 
        This is the api which is used for the game section.
*/

function GameApi() {
    var self = this;
    this.tag = 'game-api';
    var Promise = getPromise();
    var ModelGame = models.game;
    var ModelLeagueTypes = models.league_types;
    var ModelGameType = models.game_type;

    this.getTotalGame = function(req, res) {
        var organization = this.getOrganization(req, res);
        ModelGame.findAndCountAll({
            where: {
                organization_id: organization.id
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

    this.getGameTypes = function(req, res) {
        ModelGameType.all().then(function(game_types) {
            if (game_types) {
                var g_types = [];
                for (var x in game_types) {
                    var gt = {};
                    gt.id = game_types[x].id;
                    gt.description = game_types[x].description;
                    gt.name = game_types[x].name;
                    g_types.push(gt);
                }
                res.status(200).json({
                    game_types: g_types,
                    success: true
                });
            } else {
                this.getErrorApi().sendError(1067, 500, res);
            }
        });
    }

    this.getLeagueTypes = function(req, res) {
        ModelLeagueTypes.all().then(function(league_types) {
            if (league_types) {
                var leg_types = [];
                for (var x in league_types) {
                    if(!league_types[x].is_active){
                        continue;
                    }
                    var lt = {};
                    lt.id = league_types[x].id;
                    lt.description = league_types[x].description;
                    lt.name = league_types[x].name;
                    leg_types.push(lt);
                }
                res.status(200).json({
                    league_types: leg_types,
                    success: true
                });
            } else {
                this.getErrorApi().sendError(1066, 500, res);
            }
        });
    }

    this.find = function(req, res) {
        var organization = self.getOrganization(req, res);
        res.status(200).json({
            games: [],
            success: true
        });
    }

    this.create = function(req, res) {
        var organization = self.getOrganization(req, res);
        res.status(200).json({
            success: true
        });
    }
}

module.exports = GameApi;
