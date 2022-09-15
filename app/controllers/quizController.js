const { Quiz, User } = require('../models/');

const quizController = {
    index(req, res) {
        res.render('_');
    },

    async showAll(req, res) {
        try {
            // les asso sont dans index.js des models
            const quiz = await Quiz.findAll({
                include: [
                    { association: 'author' },
                    //{ association: 'questions' }
                ],
                order: ['id'],
            });

            res.render('home', { quiz: quiz });

        } catch (error) {
            console.error(error);
        }
    },


    async showOne(req, res) {
        try {
            const { id } = req.params;
            // recuperer un quiz avec auteur, catégories, questions, réponses et level
            // triés par titre

            if(isNaN(id)) {
                throw new Error('Id non valide');
            }


            const quiz = await Quiz.findOne({
                include: [
                    {
                        association: 'author',
                        attributes: {
                            exclude: ['created_at', 'updated_at','email','password'],
                        },
                    },
                    {
                        association: 'taglist',
                        attributes: {
                            exclude: ['created_at', 'updated_at'],
                        },
                    },
                    {
                        association: 'questions',
                        include: [
                            {
                                association: 'level',
                                attributes: {
                                    exclude: ['created_at', 'updated_at'],
                                },
                            },
                            {
                                association: 'answers',
                                attributes: {
                                    exclude: ['created_at', 'updated_at'],
                                },
                            },
                            {
                                association: 'good_answer',
                                attributes: {
                                    exclude: ['created_at', 'updated_at'],
                                },
                            },
                        ],
                        attributes: {
                            exclude: ['created_at', 'updated_at'],
                        },
                    },
                ],
                where: { id: id },
                order: ['id'],
                attributes: {
                    exclude: ['created_at', 'updated_at',,'user_id'],
                },
            });

            // res.json({ quiz: quiz })
            res.render('quiz', { quiz: quiz });

        } catch (error) {
            console.error(error);
        }
    },

};

module.exports = quizController;
