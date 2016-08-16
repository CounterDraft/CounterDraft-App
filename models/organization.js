"use strict";

module.exports = function(sequelize, DataTypes) {
    var Organization = sequelize.define("organization", {
        organization_id: {
            type: DataTypes.BIGINT,
            field: 'organization_id',
            primaryKey: true,
            autoIncrement: true, // Automatically gets converted to SERIAL for postgres
            comment: "Unique key for organizations"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of organization"
        },
        organization_type_id: {
            type: DataTypes.INTEGER,
            field: 'organization_type',
            allowNull: false,
            comment: "ForeignKey from organizations_type."
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the organization"
        },
        hasMultiAdmin: {
            type: DataTypes.STRING,
            field: 'has_multi_admin',
            allowNull: false,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Organization.belongsTo(models.organization_type, {foreignKey: 'organization_type_id'});
            }
        }
    });

    return Organization;
};
