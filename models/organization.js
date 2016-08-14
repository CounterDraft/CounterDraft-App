module.exports = {
    create: function(sequelize, mOrganizationType) {
        
        var Organization = sequelize.define('organization', {
            organizationId: {
                type: Sequelize.BIGINT,
                field: 'organization_id',
                primaryKey: true,
                autoIncrement: true, // Automatically gets converted to SERIAL for postgres
                comment: "Unique key for organizations"
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Name of organization"
            },
            organization_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: mOrganizationType,
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                },
                comment: "Key for organizations type"
            },
            description: {
                type: Sequelize.TEXT,
                comment: "Description of the organization"
            },
            hasMultiAdmin: {
                type: Sequelize.STRING,
                ield: 'has_multi_admin',
                allowNull: false,
                defaultValue: false
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
        Organization.sync();
        return Organization;
    }
}
