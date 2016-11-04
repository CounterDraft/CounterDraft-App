'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'organization',
            'employee_registration_email', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: "If set we send a email when a employee registers to confirm there email_address."
            }
        ).then(function(result) {
            return queryInterface.addColumn(
                'organization',
                'patron_registration_email', {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                    comment: "If set we send a email when a patron registers to there email_address."
                }
            );
        }).then(function(result) {
            return queryInterface.addColumn(
                'organization',
                'password_expire_time', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 45,
                    comment: "If set we send a email when a patron registers to there email_address."
                }
            );
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('organization', 'employee_registration_email')
            .then(function(result) {
                return queryInterface.removeColumn('organization', 'patron_registration_email');
            }).then(function(result) {
                return queryInterface.removeColumn('organization', 'password_expire_time');
            });
    }
};
