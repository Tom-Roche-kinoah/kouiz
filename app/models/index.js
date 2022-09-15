const Answer = require('./answer');
const Level = require('./level');
const Quiz = require('./quiz');
const QuizHasTag = require('./quizHasTag');
const Question = require('./question');
const Tag = require('./tag');
const User = require('./user');

// Question et Level
Question.belongsTo(Level, {
    foreignKey: 'level_id',
    as: 'level'
});
Level.hasMany(Question, {
    foreignKey: 'level_id',
    as: 'question'
});


// Question et Quiz
Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    as: 'questions',
});
Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'questions',
});


// Question et Answer
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers',
});
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question',
});
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer',
});


// Quiz et User
Quiz.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author',
});
User.hasMany(Quiz, {
    foreignKey: 'user_id',
    as: 'quiz_list',
});


// Tag et Quiz
Tag.belongsToMany(Quiz, {
    as: 'quizlist',
    through: 'quiz_has_tag',
    foreignKey: 'quiz_id',
    otherKey: 'tag_id'
});
Quiz.belongsToMany(Tag, {
    as: 'taglist',
    through: 'quiz_has_tag',
    foreignKey: 'quiz_id',
    otherKey: 'tag_id'
});



module.exports = { Answer, Level, Quiz, QuizHasTag, Question, Tag, User };