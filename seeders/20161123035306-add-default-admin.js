'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('admin_user', [{
            first_name: 'admin',
            last_name: 'counter',
            username: 'admin@counterdraft.com',
            password: 'sha1$864f5f30$1$fe38b7457a4c2e466f635a3382a207570298d0e2',
            is_active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('admin_user', null, {});
    }
};
