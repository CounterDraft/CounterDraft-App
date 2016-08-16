"use strict";
module.exports = function(sequelize, DataTypes) {
    var PatronPlayer = sequelize.define('patron_player', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Patron's first name"
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Patron's last name"
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Patron's username"
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Patron's email address"
        },
        password: {
            type: DataTypes.STRING(64),
            comment: "Patron's hashed password"
        },
        patron_organization: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the organization."
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                PatronPlayer.belongsTo(models.organization, { foreignKey: 'patron_organization', target: 'id' });
            }
        }
    });

    return PatronPlayer;
}
