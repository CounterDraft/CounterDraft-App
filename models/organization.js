"use strict";

module.exports = function(sequelize, DataTypes) {
    var Organization = sequelize.define("organization", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of organization"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the organization"
        },
        has_multi_admin: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "defines the type of organization."
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Organization.belongsTo(models.organization_type, { foreignKey: 'type', target: 'id' });
            }
        }
    });

    return Organization;
};
