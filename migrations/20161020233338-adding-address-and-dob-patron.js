'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'patron_player',
            'dob', {
                type: Sequelize.DATEONLY,
                allowNull: true,
                comment: "Date of brith for the patron."
            }
        ).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'street_number', {
                    type: Sequelize.STRING(16),
                    allowNull: true,
                    comment: "address field for patron."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'route', {
                    type: Sequelize.STRING,
                    allowNull: true,
                    comment: "address field for patron."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'locality', {
                    type: Sequelize.STRING,
                    allowNull: true,
                    comment: "address field for patron."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'administrative_area_level_1', {
                    type: Sequelize.STRING,
                    allowNull: true,
                    comment: "address field for patron."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'administrative_area_level_2', {
                    type: Sequelize.STRING,
                    allowNull: true,
                    comment: "address field for patron."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'country', {
                    type: Sequelize.STRING,
                    allowNull: true,
                    comment: "address field for patron."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'postal_code', {
                    type: Sequelize.STRING(16),
                    allowNull: true,
                    comment: "address field for patron."
                }
            );
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('patron_player', 'dob')
            .then(function(result) {
                return queryInterface.removeColumn('patron_player', 'street_number');
            }).then(function(result) {
                return queryInterface.removeColumn('patron_player', 'route');
            }).then(function(result) {
                return queryInterface.removeColumn('patron_player', 'locality');
            }).then(function(result) {
                return queryInterface.removeColumn('patron_player', 'administrative_area_level_1');
            }).then(function(result) {
                return queryInterface.removeColumn('patron_player', 'administrative_area_level_2');
            }).then(function(result) {
                return queryInterface.removeColumn('patron_player', 'country');
            }).then(function(result) {
                return queryInterface.removeColumn('patron_player', 'postal_code');
            });
    }
};
