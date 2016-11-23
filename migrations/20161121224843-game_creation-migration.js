'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {

        return queryInterface.addColumn(
            'game',
            'league', {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: "Defines the league the game is mlb, nba, nhl, etc...",
                references: {
                    model: 'league_types',
                    key: 'id'
                }
            }
        ).then(function(result) {
            return queryInterface.addColumn(
                'game_type',
                'is_active', {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                    comment: "Is this game type active or not."
                }
            );
        });

    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('game', 'league')
            .then(function(result) {
                return queryInterface.removeColumn('game_type', 'is_active');
            });
    }
};
