'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'organization',
            'o_uuid', {
                type: Sequelize.UUID,
                allowNull: true,
                defaultValue: Sequelize.UUIDV4,
                comment: "The UUID which is used to save images and user data in the cloud."
            });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('organization', 'o_uuid');
    }
};
