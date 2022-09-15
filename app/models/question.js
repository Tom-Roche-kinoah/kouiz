const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./getConnexion')();


class Question extends Model {

}

Question.init(
    {
        question: DataTypes.TEXT,
        anecdote: DataTypes.STRING,
        wiki: DataTypes.STRING,
        level_id: DataTypes.INTEGER,
        answer_id: DataTypes.INTEGER,
        quiz_id: DataTypes.STRING,
    },
    {
        sequelize: sequelize,
        tableName: 'question',
    }
);

module.exports = Question;
