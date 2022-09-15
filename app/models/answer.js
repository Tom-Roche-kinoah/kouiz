const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./getConnexion')();

class Answer extends Model {}

Answer.init(
    {
        description: DataTypes.STRING,
        question_id: DataTypes.INTEGER,
    },
    // On dit au model comment se connecter a la BDD
    { sequelize: sequelize, tableName: 'answer' }
);

module.exports = Answer;
