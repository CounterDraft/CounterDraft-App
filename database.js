module.exports = {
    init: function(config, onComplete) {
        logger.info('Correction to database config=' + JSON.stringify(config));

        var sequelize = null;
        if (config.database_url) {
            sequelize = new Sequelize(config.database_url);
        } else {
            sequelize = new Sequelize(config.database, config.user, config.password, {
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
        sequelize.authenticate()
            .then(function(err) {
                logger.info('Connection has been established successfully.');
                require('./models/create-models.js').init(sequelize, onComplete);
            })
            .catch(function(err) {
                logger.error('Unable to connect to the database:', err);
            });

        return true;
    }
}
