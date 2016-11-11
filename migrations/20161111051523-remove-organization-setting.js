'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('organization', 'employee_registration_email');
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'organization',
            'employee_registration_email', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: "If set we send a email when a employee registers to confirm there email_address."
            }
        );
    }
};
