"use strict";

module.exports = function(sequelize, DataTypes) {
    var EmployeeUser = sequelize.define('employee_user', {
        employee_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true, // Automatically gets converted to SERIAL for postgres
            field: 'employee_id',
            comment: "Unique key for employee's"
        },
        first_name: {
            type: DataTypes.STRING,
            field: 'first_name',
            allowNull: false,
            comment: "employee's first name"
        },
        last_name: {
            type: DataTypes.STRING,
            field: 'last_name',
            allowNull: false,
            comment: "employee's last name"
        },
        username: {
            type: DataTypes.STRING,
            field: 'username',
            allowNull: false,
            comment: "employee's username"
        },
        email_address: {
            type: DataTypes.STRING,
            field: 'email_address',
            allowNull: false,
            comment: "employee's email address"
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "employee's hashed password"
        },
        organization_id: {
            type: DataTypes.BIGINT,
            field: 'organization_id',
            allowNull: false,
            comment: "Unique key for organizations"
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "defines if a employee is a admin or not. true = admin, false = not admin."
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                EmployeeUser.belongsTo(models.organization, { foreignKey: 'organization_id' });
            }
        }
    });

    return EmployeeUser;
}
