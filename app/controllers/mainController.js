const { Sequelize, Model, DataTypes } = require('sequelize');
const { Quiz, Question } = require('../models/');

const mainController = {
    async homePage(req, res) {
        try {
            // recuperer les quiz avec auteur et catégories
            // triés par titre
            const quiz = await Quiz.findAll({
                include: [
                    {
                        association: 'author',
                        attributes: ['id','firstname','lastname'],
                    },
                    {
                        association: 'taglist',
                        attributes: {
                            exclude: ['created_at', 'updated_at'],
                        },
                    }
                ],
                attributes: {
                    exclude: ['created_at', 'updated_at'],
                },
                order: [ 'title' ],
            });


            // recuperer une anectode aléatoire
            const question = await Question.findOne({
                order: Question.sequelize.random() ,
            });

            res.render('home', {
                quiz: quiz,
                anecdote: question.anecdote,
            });
        } catch (error) {
            // Il faut avoir une fonction qui gère les erreurs
            console.error(error);
        } finally {
            // pour terminer
        }
    },
};

module.exports = mainController;
