'use strict';
module.exports = function(sequelize, DataTypes) {
    var EmployeeInvite = sequelize.define('employee_invite', {
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Email_address which invite was sent too."
        },
        code: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "Hashed UUID for employee/user signup"
        },
        invite_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "The employee who created this invitation."
        },
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the organization, which the new employee we be connected too."
        },
        expire: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Date/time which retrieve_token will expire."
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "Defines if a employee is a admin or not. true = admin, false = not admin."
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "Is invite still active or not."
        }
    }, {
        classMethods: {
            associate: function(models) {
                EmployeeInvite.belongsTo(models.employee_user, { foreignKey: 'invite_by', target: 'id' });
                EmployeeInvite.belongsTo(models.organization, { foreignKey: 'organization_id', target: 'id' });
            }
        }
    });
    return EmployeeInvite;
};
