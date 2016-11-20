'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'organization',
            'phone', {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "phone number for patron."
            }
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('organization', 'phone');
    }
};
