"use strict";

module.exports = function(sequelize, DataTypes) {
    var LeagueTypes = sequelize.define("league_types", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the game league."
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "Description of the league."
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "Is this league type active or not."
        },
        website: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "The website for the league."
        }
    }, {
        classMethods: { associate: function(models) {
            //none;
        }}
    });

    return LeagueTypes;
};
