'use strict';
module.exports = function(sequelize, DataTypes) {
    var OrganizationAddress = sequelize.define('organization_address', {
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "defines the organization."
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Name of the location organization."
        },
        type:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines what type of address this is, eg. primary, secondary etc.."
        },
        street_number: {
            type: DataTypes.STRING(16),
            allowNull: true,
            comment: "address field for patron."
        },
        route: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "address field for patron."
        },
        locality: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "address field for patron."
        },
        administrative_area_level_1: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "address field for patron."
        },
        administrative_area_level_2: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "address field for patron."
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "address field for patron."
        },
        postal_code: {
            type: DataTypes.STRING(16),
            allowNull: true,
            comment: "address field for patron."
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "If flagged the addresss has been removed from the system."
        }
    }, {
        classMethods: {
            freezeTableName: true,
            tableName: 'organization_address',
            associate: function(models) {
                OrganizationAddress.belongsTo(models.organization, { foreignKey: 'organization_id', target: 'id' });
                OrganizationAddress.belongsTo(models.address_type, { foreignKey: 'type', target: 'id' });
            }
        }
    });
    return OrganizationAddress;
};
