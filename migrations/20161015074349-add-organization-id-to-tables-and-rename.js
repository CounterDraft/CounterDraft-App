'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.renameColumn('patron_player', 'patron_organization', 'organization_id')
            .then(function(result) {
                return queryInterface.renameColumn('employee_user', 'employee_organization', 'organization_id')
            })
            .then(function(result) {
                return queryInterface.addColumn(
                    'game',
                    'organization_id', {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        comment: "defines the organization.",
                        references: {
                            model: 'organization',
                            key: 'id',
                            as: 'organization_id'
                        }
                    }
                );
            });
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.renameColumn('patron_player', 'organization_id', 'patron_organization')
            .then(function(result) {
                return queryInterface.renameColumn('employee_user', 'organization_id', 'employee_organization')
            })
            .then(function(result) {
                return queryInterface.removeColumn('game', 'organization_id');
            });
    }
};
