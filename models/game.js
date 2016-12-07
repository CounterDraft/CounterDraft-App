"use strict";

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("game", {
        game_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            comment: "Unique number for the game"
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the type of game this is."
        },
        league: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the league the game is mlb, nba, nhl, etc..."
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "Start time and date of game."
        },
        end: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Start time and date of game."
        },
        transaction: {
            type: DataTypes.BIGINT,
            allowNull: true,
            comment: "Links to tranaction record, null = game has not ended or was cancelled."
        },
        cap: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Salary cap is used to determine used for skilled games, null or 0 = no cap"
        },
        fee:{
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Fee defines how much it cost to entry the contest, null = no fee"
        },
        p_max:{
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Max number of players."
        },
        p_min:{
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Min number of players, if not reached game will not start."
        },
        hold:{
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Percentage of the pool money which the organization keeps."
        },
        multiplier: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            comment: "Used for calculating the winning for all the places."
        },
        places:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines how many winners, example 1 = only frist place wins the pool, 2 = 1st and 2nd win the pool."
        },
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "defines the organization."
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "Is the game active or not"
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Game.belongsTo(models.game_type, { foreignKey: 'type', target: 'id' });
                Game.belongsTo(models.payout, { foreignKey: 'transaction' });
                Game.belongsTo(models.organization, { foreignKey: 'organization_id', target: 'id' });
                Game.belongsTo(models.league_types, { foreignKey: 'league', target: 'id' });
            }
        }
    });

    return Game;
};
