'use strict';
module.exports = function(sequelize, DataTypes) {
    var Patron_games = sequelize.define('patron_games', {
        game_id: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: "Unique number for the a game."
        },
        patron_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the id of the patron."
        },
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Defines the id of the patron."
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Patron_games.belongsTo(models.game, { foreignKey: 'game_id', target: 'game_id' });
                Patron_games.belongsTo(models.patron_player, { foreignKey: 'patron_id', target: 'id' });
                Patron_games.belongsTo(models.organization, { foreignKey: 'organization_id', target: 'id' });
            }
        }
    });
    return Patron_games;
};
