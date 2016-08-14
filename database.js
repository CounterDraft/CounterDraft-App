module.exports = {
    init: function(config) {
        

        return sequelize = new Sequelize(config.database, config.user, config.password, {
            host: config.host,
            port: config.port,
            dialect: 'postgres',

            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },

            // SQLite only
            // storage: 'path/to/database.sqlite'
        });
    }

}
