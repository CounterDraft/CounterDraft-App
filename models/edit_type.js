'use strict';
module.exports = function(sequelize, DataTypes) {
    var edit_type = sequelize.define('edit_type', {
        name: {
            type: DataTypes.STRING,
             allowNull: false,
             comment: "Summary of the edit."
        },
        description: {
            type: DataTypes.TEXT,
             allowNull: false,
             comment: "Full description of the edit."
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return edit_type;
};
