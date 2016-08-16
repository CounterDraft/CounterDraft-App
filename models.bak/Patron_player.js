module.exports = {
    create: function(sequelize, mOrganization) {
        var PatronPlayer = sequelize.define('patron_player', {
            patronID: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true, // Automatically gets converted to SERIAL for postgres
                field: 'player_id',
                comment: "Unique key for patrons"
            },
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name',
                allowNull: false,
                comment: "patron's first name"
            },
            lastName: {
                type: Sequelize.STRING,
                field: 'last_name',
                allowNull: false,
                comment: "patron's last name"
            },
            userName: {
                type: Sequelize.STRING,
                field: 'username',
                allowNull: false,
                comment: "patron's username"
            },
            emailAddress: {
                type: Sequelize.STRING,
                field: 'email_address',
                allowNull: false,
                comment: "patron's email address"
            },
            password: {
                type: Sequelize.STRING(64),
                comment: "patron's hashed password"
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
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
        PatronPlayer.sync();
        return PatronPlayer;
    }
}
