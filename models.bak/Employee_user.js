module.exports = {
    create: function(sequelize, mOrganization) {
        var EmployeeUser = sequelize.define('employee_user', {
            employeeID: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true, // Automatically gets converted to SERIAL for postgres
                field: 'employee_id',
                comment: "Unique key for employee's"
            },
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name',
                allowNull: false,
                comment: "employee's first name"
            },
            lastName: {
                type: Sequelize.STRING,
                field: 'last_name',
                allowNull: false,
                comment: "employee's last name"
            },
            userName: {
                type: Sequelize.STRING,
                field: 'username',
                allowNull: false,
                comment: "employee's username"
            },
            emailAddress: {
                type: Sequelize.STRING,
                field: 'email_address',
                allowNull: false,
                comment: "employee's email address"
            },
            password: {
                type: Sequelize.STRING(64),
                allowNull: false,
                comment: "employee's hashed password"
            },
            organizationId: {
                type: Sequelize.BIGINT,
                field: 'organization_id',
                allowNull: false,
                references: {
                    model: mOrganization,
                    key: 'organization_id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                },
                comment: "Unique key for organizations"
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "defines if a employee is a admin or not. true = admin, false = not admin."
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
        EmployeeUser.sync();

        return EmployeeUser;
    }
}
