const { Tag, Quiz } = require('../models/');

const tagController = {

    async list(req, res) {
        try {
            // les asso sont dans index.js des models
            const tags = await Tag.findAll({
                attributes: {
                    exclude: ['created_at', 'updated_at'],
                },
                order: ['name'],
            });

            res.render('categories', { tags: tags });

        } catch (error) {
            console.error(error);
        }
    },

    async quizListByTag(req, res) {
        try {
            // recuperer les quiz avec auteur
            // triés par titre
            // dont la category est : id
            const { id } = req.params;

            const tag = await Tag.findByPk(id);
            const quiz = await Quiz.findAll({
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
                        where: { id: id },
                    },
                ],
                attributes: {
                    exclude: ['created_at', 'updated_at'],
                },
            });

            // const tagWithQuizzes = await Tag.findOne({
            //     where: { id: id },
            //     include: [
            //         {
            //             association: 'quizlist',
            //             include: [
            //                 {
            //                     association: 'author',
            //                 },
            //                 {
            //                     association: 'taglist',
            //                 },
            //             ]
            //         },
            //     ],
            // });

            const tagName = await Tag.findByPk(id);

            // res.json({tagWithQuizzes});
            res.render('category', {
                tag: tag,
                quiz: quiz,
            });
        } catch (error) {
            // Il faut avoir une fonction qui gère les erreurs
            console.error(error);
        } finally {
            // fini
        }
    },

};

module.exports = tagController;
