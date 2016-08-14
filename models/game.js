module.exports = {
    create: function(sequelize) {
        var Game = sequelize.define('GAME', {
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name'
            },
            lastName: {
                type: Sequelize.STRING,
                field: 'last_name'
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        }).sync();

        return Game;
    }
}
