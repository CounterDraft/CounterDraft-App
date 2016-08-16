"use strict";

module.exports = function(sequelize, DataTypes) {
    var GameType = sequelize.define("game_type", {
        name: {
            type: DataTypes.STRING,
            comment: "Name of the game type"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of game type"
        },
    }, {
        freezeTableName: true,
        classMethods: { associate: function(models) {
            //none;
        }}
    });

    return GameType;
};
