const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./getConnexion')();

class QuizHasTag extends Model {}

QuizHasTag.init(
    {
        name: DataTypes.STRING,
    },
    // On dit au model comment se connecter a la BDD
    { sequelize: sequelize, tableName: 'quiz_has_tag' }
);

module.exports = QuizHasTag;