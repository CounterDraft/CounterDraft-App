module.exports = {
    create: function(sequelize) {
        var OrganizationType = sequelize.define('organization_type', {
            description: {
                type: Sequelize.TEXT,
                comment: "Description of the type of organization type"
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
        OrganizationType.sync();
        return OrganizationType;
    }
}
