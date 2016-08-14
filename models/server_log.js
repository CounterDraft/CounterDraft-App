module.exports = {
    create: function(sequelize) {
        var ServerLog = sequelize.define('server_log', {
            type: {
                type: Sequelize.STRING(64),
                allowNull: false,
            },
            message: {
                type: Sequelize.STRING(255),
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
        ServerLog.sync();
        return ServerLog;
    }
}
