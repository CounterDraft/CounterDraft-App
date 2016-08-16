"use strict";

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("game", {
        game_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            comment: "Unique number for the game"
        },
        type:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the type of game this is."
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
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Game.belongsTo(models.game_type, { foreignKey: 'type', target:'id'});
                Game.belongsTo(models.payout, { foreignKey: 'transaction'});
            }
        }
    });

    return Game;
};
