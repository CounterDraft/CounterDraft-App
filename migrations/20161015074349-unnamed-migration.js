'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.renameColumn('Person','signature','sig')
    },

    down: function(queryInterface, Sequelize) {

    }
};
