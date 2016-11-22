'use strict';
module.exports = function(sequelize, DataTypes) {
    var Transactions = sequelize.define('transactions', {
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the type of tansaction."
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Dollar amount of the tranaction."
        },
        patron_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the patron for this tranaction."
        },
        game_id:{
            type: DataTypes.UUID,
            allowNull: true,
            comment: "What game is this for."
        }
    }, {
        freezeTableName: true,
        tableName: 'transactions',
        classMethods: {
            associate: function(models) {
                Transactions.belongsTo(models.trans_types, { foreignKey: 'type', target: 'id' });
                Transactions.belongsTo(models.patron_player, { foreignKey: 'patron_id', target: 'id' });
                Transactions.belongsTo(models.game, { foreignKey: 'game_id', target: 'game_id' });
            }
        }
    });
    return Transactions;
};
