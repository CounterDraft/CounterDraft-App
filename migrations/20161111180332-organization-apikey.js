'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'organization',
            'api_key', {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Secret api key for a organziation, we check this on every rest request."
            }
        );
    },

    down: function(queryInterface, Sequelize) {
      return queryInterface.changeColumn(
            'organization',
            'api_key', {
                type: Sequelize.STRING(64),
                comment: "Secret api key for a organziation, we check this on every rest request."
            }
        );
    }
};
