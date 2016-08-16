"use strict";
module.exports = function(sequelize, DataTypes) {
    var PatronPlayer = sequelize.define('patron_player', {
        patronID: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true, // Automatically gets converted to SERIAL for postgres
            field: 'player_id',
            comment: "Unique key for patrons"
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',
            allowNull: false,
            comment: "patron's first name"
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
            allowNull: false,
            comment: "patron's last name"
        },
        userName: {
            type: DataTypes.STRING,
            field: 'username',
            allowNull: false,
            comment: "patron's username"
        },
        emailAddress: {
            type: DataTypes.STRING,
            field: 'email_address',
            allowNull: false,
            comment: "patron's email address"
        },
        password: {
            type: DataTypes.STRING(64),
            comment: "patron's hashed password"
        },
        organization_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "ForeignKey for organization, maps to the organization table."
        }
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        classMethods: {
            associate: function(models) {
                PatronPlayer.belongsTo(models.organization, {foreignKey: 'organization_id'}); // Adds fk_companyname to User
            }
        }
    });

    return PatronPlayer;
}
