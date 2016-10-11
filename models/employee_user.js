"use strict";

module.exports = function(sequelize, DataTypes) {
    var EmployeeUser = sequelize.define('employee_user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "employee's first name"
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "employee's last name"
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "employee's username"
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "employee's email address"
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "employee's hashed password"
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "defines if a employee is a admin or not. true = admin, false = not admin."
        },
        employee_organization: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "defines the organization."
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "Is the employee active or not."
        },
        is_email_confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "If false we have yet to confirmed the email_address."
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                EmployeeUser.belongsTo(models.organization, { foreignKey: 'employee_organization', target: 'id' });
            }
        }
    });

    return EmployeeUser;
}
