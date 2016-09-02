"use strict";

module.exports = function(sequelize, DataTypes) {
    var Reports = sequelize.define('reports', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the report"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "Description of what the report shows."
        },
        authorized: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "authorized type who can view this report."
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                // None
            }
        }
    });

    return Reports;
}
