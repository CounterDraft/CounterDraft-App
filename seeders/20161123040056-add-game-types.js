'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('game_type', [{
            name: 'parimutuel',
            description: 'A contest which allows a player to choose the top performers in a defined position in the league.',
            is_active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'weekly',
            description: 'A week long contest which allows all teams to play in the league.',
            is_active: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'seasonal',
            description: 'A season long contest which allows all teams to play all games in the regular season.',
            is_active: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('game_type', null, {});
    }
};
