module.exports = {
    create: function(sequelize) {
        var GameHistroy = sequelize.define('game_histroy', {
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
        });
        GameHistroy.sync();
        return GameHistroy;
    }
}
