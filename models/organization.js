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
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "Is the organization active or not"
        },
        o_uuid: {
            type: DataTypes.UUID,
            allowNull: true,
            defaultValue: DataTypes.UUIDV4,
            comment: "The UUID which is used to save images and user data in the cloud."
        },
        api_key: {
            type: DataTypes.STRING(16),
            allowNull: false,
            comment: "Secret api key for a organziation, we check this on every rest request."
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
