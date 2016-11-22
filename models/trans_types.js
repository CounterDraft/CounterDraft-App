'use strict';
module.exports = function(sequelize, DataTypes) {
    var TransactionsTypes = sequelize.define('trans_types', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "The name of the money transaction."
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "The description of the money transaction."
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return TransactionsTypes;
};
