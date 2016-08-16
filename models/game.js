"use strict";

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("game", {
        game_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            comment: "Unique number for the game"
        },
        game_type_id:{
            type: DataTypes.INTEGER,
            comment: "Idenitifies the type of game"
        },
        name: {
            type: DataTypes.STRING,
            comment: "name of the game type"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of game"
        },
    }, {
        freezeTableName: true,
        classMethods: { associate: function(models) {
            Game.belongsTo(models.game_type, {foreignKey: 'game_type_id'});
        }}
    });

    return Game;
};
