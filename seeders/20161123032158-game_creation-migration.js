'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('league_types', [{
            name: 'MLB',
            description: 'Mens american major league baseball.',
            is_active: true,
            website: 'http://mlb.mlb.com/mlb/schedule/index.jsp',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'NBA',
            description: 'Mens american national basketball association.',
            is_active: false,
            website: 'http://www.nba.com/schedules/national_tv_schedule',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'NFL',
            description: 'Mens american national football league.',
            is_active: false,
            website: 'http://www.nfl.com/schedules',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'NHL',
            description: 'Mens american national hockey league',
            is_active: false,
            website: 'https://www.nhl.com/schedule',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'PGA',
            description: 'Mens professional golfers\' association league',
            is_active: false,
            website: 'http://www.pgatour.com/tournaments/schedule.html',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('league_types', null, {});
    }
};
