'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'organization',
            'api_key', {
                type: Sequelize.STRING(32),
                comment: "Secret api key for a organziation, we check this on every rest request."
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('organization', 'api_key');
    }
};
