'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'employee_user',
            'e_uuid', {
                type: Sequelize.UUID,
                allowNull: true,
                defaultValue: Sequelize.UUIDV4,
                comment: "The UUID which is used to save images and user data in the cloud."
            }
        ).then(function(result) {
            return queryInterface.addColumn(
                'patron_player',
                'p_uuid', {
                    type: Sequelize.UUID,
                    allowNull: true,
                    defaultValue: Sequelize.UUIDV4,
                    comment: "The UUID which is used to save images and user data in the cloud."
                }
            );
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('employee_user', 'e_uuid')
            .then(function(result) {
                return queryInterface.removeColumn('patron_player', 'p_uuid')
            });
    }
};
