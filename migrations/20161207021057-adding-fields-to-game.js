'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {

        return queryInterface.addColumn(
            'game',
            'cap', {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: "Salary cap is used to determine used for skilled games, null or 0 = no cap"
            }
        ).then(function(result) {
            return queryInterface.addColumn(
                'game',
                'fee', {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    comment: "Fee defines how much it cost to entry the contest, null = no fee"
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'game',
                'p_max', {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    comment: "Max number of players."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'game',
                'p_min', {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    comment: "Min number of players, if not reached game will not start."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'game',
                'hold', {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    comment: "Percentage of the pool money which the organization keeps."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'game',
                'multiplier', {
                    type: Sequelize.DOUBLE,
                    allowNull: false,
                    defaultValue: 1.0,
                    comment: "Used for calculating the winning for all the places."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'game',
                'places', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: "Defines how many winners, example 1 = only frist place wins the pool, 2 = 1st and 2nd win the pool."
                }
            );
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('game', 'cap')
            .then(function(result) {
                return queryInterface.removeColumn('game', 'fee');
            }).then(function(result) {
                return queryInterface.removeColumn('game', 'p_max');
            }).then(function(result) {
                return queryInterface.removeColumn('game', 'p_min');
            }).then(function(result) {
                return queryInterface.removeColumn('game', 'hold');
            }).then(function(result) {
                return queryInterface.removeColumn('game', 'multiplier');
            }).then(function(result) {
                return queryInterface.removeColumn('game', 'places');
            });
    }
};
