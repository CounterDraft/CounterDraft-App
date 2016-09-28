'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
            'registration_user',
            'is_active', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: "defines if the token has been used or not."
            }
        );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('registration_user', 'is_active');
  }
};
