"use strict";

module.exports = function(sequelize, DataTypes) {
    var Reports_parameters = sequelize.define('reports_parameters', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the report"
        },
        data_type: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "defines what type of value the paramter will be."
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Reports_parameters.belongsTo(models.reports, { foreignKey: 'report_id', targetKey: 'id' });
            }
        }
    });

    return Reports_parameters;
}
