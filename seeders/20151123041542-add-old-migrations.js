'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        //ALL MIGRATIONS SHOULD BE ADD HERE FOR FRESH ENVIOMENT SETUPS;
        return queryInterface.bulkInsert('sequelize_meta', [{
            name: '20160926231604-adding-isActive-migration.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20160928045755-adding-valid-registration-user.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161011165604-adding-isemail-employee-migration.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161013230505-add-uuid-to-patron-and-employee-migration.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161013233039-add-email-support-patron-player-migration.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161014041404-add-organization-uuid-migration.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161014182454-add-organization-key-migration.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161015074349-add-organization-id-to-tables-and-rename.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161020233338-adding-address-and-dob-patron.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161023064035-add-retrieve-to-patron-employee.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161025191631-adding-phone-to-patron.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161104181626-settings-organization.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161105223424-correcting-field-organization.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161111051523-remove-organization-setting.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161111180332-organization-apikey.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161120225524-add-phone-to-organization.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161121224843-game_creation-migration.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161207021057-adding-fields-to-game.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '20161223184314-adding-field-to-league.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: function(queryInterface, Sequelize) {

        return queryInterface.bulkDelete('sequelize_meta', null, {});

    }
};
