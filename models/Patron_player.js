module.exports = {
    create: function(sequelize) {
        var PatronPlayer = sequelize.define('PATRON_PLAYER', {
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name'
            },
            lastName: {
                type: Sequelize.STRING,
                field: 'last_name'
            },
            userName: {
                type: Sequelize.STRING,
                field: 'username'
            },
            emailAddress:{
                type: Sequelize.STRING,
                field: 'email_address'
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        }).sync();

        return PatronPlayer;
    }
}
