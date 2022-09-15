const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./getConnexion')();

class Quiz extends Model {

}

Quiz.init(
    {
        title: DataTypes.TEXT,
        description: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
    },
    {
        sequelize: sequelize,
        tableName: 'quiz',
    }
);

module.exports = Quiz;
