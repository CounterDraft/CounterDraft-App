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
