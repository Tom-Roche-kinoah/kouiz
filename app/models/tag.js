const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./getConnexion')();

class Tag extends Model {}

Tag.init(
    {
        name: DataTypes.STRING,
    },
    // On dit au model comment se connecter a la BDD
    { sequelize: sequelize, tableName: 'tag' }
);

module.exports = Tag;
