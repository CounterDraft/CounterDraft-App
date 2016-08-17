'use strict';
module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define('session', {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            deferrable: sequelize.Deferrable.NOT
        },
        sess: {
            type: DataTypes.JSON,
            allowNull: false
        },
        expire: {
            type: DataTypes.DATE(6),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Session;
};


// CREATE TABLE "session" (
//   "sid" varchar NOT NULL COLLATE "default",
//     "sess" json NOT NULL,
//     "expire" timestamp(6) NOT NULL
// )
// WITH (OIDS=FALSE);
// ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
