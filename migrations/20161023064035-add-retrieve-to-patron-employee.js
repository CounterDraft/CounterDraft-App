'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'employee_user',
            'retrieve_token', {
                type: Sequelize.STRING(64),
                allowNull: true,
                comment: "Hash token used for reseting password."
            }
        ).then(function(result) {
            return queryInterface.addColumn(
                'employee_user',
                'retrieve_expiration', {
                    type: Sequelize.DATE,
                    allowNull: true,
                    comment: "Date/time which retrieve_token will expire."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'retrieve_token', {
                    type: Sequelize.STRING(64),
                    allowNull: true,
                    comment: "Hash token used for reseting password."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'retrieve_expiration', {
                    type: Sequelize.DATE,
                    allowNull: true,
                    comment: "Date/time which retrieve_token will expire."
                }
            );
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('patron_player', 'retrieve_token')
            .then(function(result) {
                return queryInterface.removeColumn('patron_player', 'retrieve_expiration');
            }).then(function(result) {
                return queryInterface.removeColumn('employee_user', 'retrieve_token');
            }).then(function(result) {
                return queryInterface.removeColumn('employee_user', 'retrieve_expiration');
            });
    }
};
