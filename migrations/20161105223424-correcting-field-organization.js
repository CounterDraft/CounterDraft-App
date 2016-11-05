'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'organization',
            'multi_admin', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: "If true the organization has more then one administrator."
            }
        ).then(function(result) {
            return queryInterface.removeColumn('organization', 'has_multi_admin');
        })

    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'organization',
            'has_multi_admin', {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: true,
                comment: "If true the organization has more then one administrator."
            }
        ).then(function(result) {
            return queryInterface.removeColumn('organization', 'multi_admin');
        });
    }
};
