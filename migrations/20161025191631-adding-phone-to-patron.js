'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'patron_player',
            'phone', {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "phone number for patron."
            }
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('patron_player', 'phone');
    }
};
