module.exports = {
    create: function(sequelize) {
        var Employee_user = sequelize.define('EMPLOYEE_USER', {
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

        // User.sync({ force: true }).then(function() {
        //     // Table created
        //     return User.create({
        //         firstName: 'John',
        //         lastName: 'Hancock'
        //     });
        // });

        return Employee_user;
    }
}
