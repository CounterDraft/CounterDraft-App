'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'employee_user',
            'is_email_confirmed', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "If false we have yet to confirmed the email_address"
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('employee_user', 'is_email_confirmed');
    }
};
