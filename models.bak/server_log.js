module.exports = {
    create: function(sequelize) {
        var ServerLog = sequelize.define('server_log', {
            meta: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            level: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            msg: {
                type: Sequelize.TEXT            
            }
        }, {
            timestamps: false,
            freezeTableName: true // Model tableName will be the same as the model name
        });
        ServerLog.sync();
        return ServerLog;
    }
}
