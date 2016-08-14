module.exports = {
    create: function(sequelize) {
        var GameType = sequelize.define('GAME_TYPE', {
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

        return GameType;
    }
}
