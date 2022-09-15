const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./../models/getConnexion')();

const { Question, Level, Quiz } = require('../models/');

const questionController = {

    index(req, res) {
        res.render('_');
    },

    async addQuestion(req, res) {

        if(!req.session.user || req.session.user.role !== 'admin') {
            return res.redirect('/');
        }

        try {
            // récuperer tous les niveaux
            const levels = await Level.findAll({
                attributes: {
                    exclude: ['created_at', 'updated_at'],
                },
            });
            // récuperer tous les nivequizaux
            const quizList = await Quiz.findAll({
                attributes: {
                    exclude: ['created_at', 'updated_at'],
                },
                order: [ 'title' ],
            });

            res.render('addQuestion',{
                levels: levels,
                quizList, quizList,
            });

        } catch (error) {
            console.error(error);
        }
    },

    async saveQuestion(req, res) {
        const { question, anecdote, wiki, level_id } = req.body;
        try {
            // todo

        } catch (error) {
            console.error(error);
        }
    },

    async showAll(req, res) {

        if(!req.session.user || req.session.user.role !== 'admin') {
            return res.redirect('/');
        }

        try {
            // les asso sont dans index.js des models
            const questions = await Question.findAll({
                include: [
                    {
                        association: 'level',
                        attributes: {
                            exclude: ['created_at', 'updated_at'],
                        },
                    },
                    //{ association: 'questions' }
                ],
            });

            res.render('questions', { questions: questions });
        } catch (error) {
            console.error(error);
        }
    },

    async showOne(req, res) {

        if(!req.session.user || req.session.user.role !== 'admin') {
            return res.redirect('/');
        }

        try {
            const { id } = req.params;
            // Aller chercher une question
            // Trouver la méthode Sequelize qui permet de récupérer une resource par son ID
            // ID : Primary Key : PK
            const question = await Question.findOne({
                include: [
                    {
                        association: 'good_answer',
                        attributes: {
                            exclude: ['created_at', 'updated_at'],
                        },
                    },
                    {
                        association: 'level',
                        attributes: {
                            exclude: ['created_at', 'updated_at'],
                        },
                    },
                ],
                where: { id: id},
            });

            res.render('question', { question: question });
        } catch (error) {
            console.error(error);
        }
    },

};

module.exports = questionController;
