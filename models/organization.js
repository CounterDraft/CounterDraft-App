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
        },
        multi_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "If true the organization has more then one administrator."
        },
        patron_registration_email: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "If set we send a email when a patron registers to there email_address."
        },
        password_expire_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 45,
            comment: "If set we send a email when a patron registers to there email_address."
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
