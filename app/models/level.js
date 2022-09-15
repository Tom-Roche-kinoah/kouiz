const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./getConnexion')();

class Level extends Model {}

Level.init(
    {
        name: DataTypes.STRING,
    },
    // On dit au model comment se connecter a la BDD
    { sequelize: sequelize, tableName: 'level' }
);

module.exports = Level;
