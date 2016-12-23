'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {

        return queryInterface.addColumn(
            'league_types',
            'image', {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "File name of icon for league."
            }
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('league_types', 'image');
    }
};
