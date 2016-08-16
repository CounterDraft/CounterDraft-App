'use strict';
module.exports = function(sequelize, DataTypes) {
    var game_history = sequelize.define('game_history', {
        edit: {
            type: DataTypes.BIGINT,
            allowNull: false,
            comment: "Type of edit the record is."
        },
        employee: {
            type: DataTypes.BIGINT,
            allowNull: false,
            comment: "Unique key for employee's"
        },
        game_uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: "Unique ID for the game"
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                game_history.belongsTo(models.edit_type, { foreignKey: 'edit', target: 'id' });
                game_history.belongsTo(models.employee_user, { foreignKey: 'employee', target: 'employee_id' });
                game_history.belongsTo(models.game, { foreignKey: 'game_uuid', target: 'game_id' });
            }
        }
    });
    return game_history;
};
