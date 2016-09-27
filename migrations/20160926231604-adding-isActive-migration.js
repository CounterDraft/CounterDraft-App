'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
                'employee_user',
                'is_active', {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                    comment: "Is the employee active or not"
                }
            ).then(function(result) {
                return queryInterface.addColumn(
                    'game',
                    'is_active', {
                        type: Sequelize.BOOLEAN,
                        allowNull: false,
                        defaultValue: true,
                        comment: "Is the employee active or not"
                    }
                );
            }).then(function(result) {
                return queryInterface.addColumn(
                    'organization',
                    'is_active', {
                        type: Sequelize.BOOLEAN,
                        allowNull: false,
                        defaultValue: true,
                        comment: "Is the employee active or not"
                    }
                );
            }).then(function(result) {
                return queryInterface.addColumn(
                    'patron_player',
                    'is_active', {
                        type: Sequelize.BOOLEAN,
                        allowNull: false,
                        defaultValue: true,
                        comment: "Is the employee active or not"
                    }
                );
            });
    },

    down: function(queryInterface, Sequelize) {
        return [
            queryInterface.removeColumn('employee_user', 'is_active')
            .then(function(result) {
                return queryInterface.removeColumn('game', 'is_active')
            }).then(function(result) {
                return queryInterface.removeColumn('organization', 'is_active')
            }).then(function(result) {
                return queryInterface.removeColumn('patron_player', 'is_active')
            })
        ];
    }
};
