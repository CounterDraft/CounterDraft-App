module.exports = {
    init: function(config) {
        logger.info('Correction to database config=' + JSON.stringify(config));
        var sequelize = new Sequelize(config.database, config.user, config.password, {
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
        sequelize.authenticate()
            .then(function(err) {
                logger.info('Connection has been established successfully.');
                GLOBAL.models = require('./models/create-models.js').init(sequelize);
            })
            .catch(function(err) {
                logger.error('Unable to connect to the database:', err);
            });

        return sequelize;
    }
}
