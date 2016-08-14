createTables = function(sq){
    var models = {};
    models.user = require('./user.js').create(sq);

    return models;
}

module.exports = {
    init: function(sq) {
        if (!sq) {
            logger.error('Failed to setup database!');
            return;
        }
        return createTables(sq);
    }
}
