"use strict";

module.exports = function(sequelize, DataTypes) {
    var OrganizationType = sequelize.define("organization_type", {
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the type of organization type"
        },
    }, {
        freezeTableName: true,
        classMethods: { associate: function(models) {
            //none;
        }}
    });

    return OrganizationType;
};
