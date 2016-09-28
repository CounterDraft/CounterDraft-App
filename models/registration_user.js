"use strict";

module.exports = function(sequelize, DataTypes) {
    var RegistrationUser = sequelize.define('registration_user', {
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Email address of user."
        },
        token: {
            type: DataTypes.STRING(128),
            allowNull: false,
            comment: "Unique key for confirmation of email."
        },
        valid_until: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "Token will expire on this date."
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "Defines if the token has been used or not."
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                // RegistrationUser.belongsTo(models.organization, { foreignKey: 'email_address', target: 'email_address' });
            }
        }
    });

    return RegistrationUser;
}
