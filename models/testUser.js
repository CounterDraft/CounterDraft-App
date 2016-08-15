"use strict";

module.exports = function(sequelize, DataTypes) {
  var testUser = sequelize.define("testUser", {
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    }
  });

  return User;
};