'use strict';
module.exports = function(sequelize, DataTypes) {
    var Payout = sequelize.define('payout', {
        transaction_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            comment: "Unique id for every payout transaction which takes place."
        },
        casino_hold: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Amt of money the casino hold."
        },
        bonus: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Amt of extra payouts."
        },
        bonus_description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "if bonus amt, description of what this amt is."
        },
        win_amt: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Amt of the winner 1 payout."
        },
        win_amt_1: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Amt of the winner 2 payout."
        },
        win_amt_2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Amt of the winner 3 payout."
        },
        win_amt_3: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Amt of the winner 4 payout."
        },
        win: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Patron id of the winner."
        },
        win_1: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Patron id of the winner."
        },
        win_2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Patron id of the winner."
        },
        win_3: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Patron id of the winner."
        }
    }, {
        classMethods: {
            associate: function(models) {
                Payout.belongsTo(models.patron_player, { foreignKey: 'win', target: 'id' });
                Payout.belongsTo(models.patron_player, { foreignKey: 'win_1', target: 'id' });
                Payout.belongsTo(models.patron_player, { foreignKey: 'win_2', target: 'id' });
                Payout.belongsTo(models.patron_player, { foreignKey: 'win_3', target: 'id' });
            }
        }
    });
    return Payout;
};
