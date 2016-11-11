'use strict';
module.exports = function(sequelize, DataTypes) {
    var AddressType = sequelize.define('address_type', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "String name for the address type"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "Full description of the address."
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return AddressType;
};
