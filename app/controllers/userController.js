const { User, Quiz } = require('./../models');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

const userController = {


    // page de login - Tout le monde
    login(req, res) {
        let error = [];
        res.render('login',{
            error: error,
        });
    },

    // Action de login - Tout le monde
    async loginAction(req, res) {
        // récup du post
        const { email, password } = req.body;

        // tableau d'erreurs :
        let error = [];

        // vérifs

        // si email / user invalide ou absent
        if (!emailValidator.validate(email) || !email) {
            error.push('utilisateur invalide');
        }

        // si user n'existe pas
        const user = await User.findOne({where: {email: email}});
        if (!user) {
            error.push('utilisateur non trouvé (message à remplacer)');
        } else {
            // user trouvé
            // on compare les mots de passe chiffrés
            const isMatch = await bcrypt.compare(password, user.password);

            // si pas match
            if(!isMatch) {
                error.push('connexion refusée');

            } else {
                // si match
                // on enregistre le user en session, sans mot de passe
                req.session.user = user;
                // delete req.session.user.password;
                // req.session.user.password = '';

                // const dateFr = new Date(req.session.user.created_at).toLocaleDateString('fr-fr');
                // req.session.user.created_at = dateFr;
                // console.log(dateFr);
                // console.log(req.session.user.created_at);

                // et on renvoi sur la home
                res.redirect('/');
            }
        }

        // si il y'a des erreurs on bloque et on redirige
        if(error.length > 0) {
            res.render('login',{
                error: error,
            });
            return;
        }


    },

    // Action logout - USER +
    logout(req, res) {
        req.session.user = false;
        res.redirect('/');
    },


    // page d'inscription - Tout le monde
    index(req, res) {
        let errors = [];
        res.render('register',{
            errors: errors,
        });
    },


    // Action d'inscription - Tout le monde
    async register(req, res) {
        const { email, password, password2, firstname, lastname } = req.body;

        try {
            // tableau d'erreurs :
            let errors = [];

            // vérifs

            // si email existe déja
            const isExist = await User.findOne({where: {email: email}});
            if (isExist) {
                const error = {
                    input: 'email',
                    message: 'Utilisateur déja enregistré',
                };
                errors.push(error);
            }

            // si email invalide
            if (!emailValidator.validate(email)) {
                const error = {
                    input: 'email',
                    message: 'Email invalide',
                };
                errors.push(error);
            }

            // si pas d'email
            if (!email) {
                const error = {
                    input: 'email',
                    message: 'Email obligatoire',
                };
                errors.push(error);
            }

            // si mot de passe pas assez fort
            if (password.length < 6) {
                const error = {
                    input: 'password',
                    message: 'Mot de passe trop court (minimum 6 caracteres)',
                };
                errors.push(error);
            }

            // si mots de passe ne correspondent pas
            if (password !== password2) {
                const error = {
                    input: 'password',
                    message: 'Les mots de passe ne correspondent pas',
                };
                errors.push(error);
            }

            // si il y'a des erreurs on bloque et on redirige
            if(errors.length > 0) {
                res.render('register',{
                    data: req.body,
                    errors: errors,
                });
                return;
            }

            // Chiffre le mot de passe
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            hashedPassword = hash;

            const user = new User({
                email: email,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname,
                role: 'user',
            });


            // Quand tout est ok
            await user.save();

            res.redirect('login');

        } catch (error) {
            console.error(error);
        }

    },

    // page de profil - USER +
    async profile(req, res) {

        // rechercher les quiz de l'auteur
        const quizOfAuthor = await Quiz.findAll({
            include: [
                {
                    association: 'author',
                    where: {id: req.session.user.id}
                },
            ],
            order: ['id'],
        });

        res.render('profile',{
            quizOfAuthor: quizOfAuthor,
        });
    },

    // page de profile par id - ADMIN
    async profileById(req, res) {

        try {
            const { id } = req.params;
            // Aller chercher un utilisateur
            const user = await User.findOne({
                include: [
                    {
                        association: 'quiz_list',
                        // where: {id: id}
                    },
                ],
                where: {id: id},
            });

            res.render('userProfile', { userProfile: user });
        } catch (error) {
            console.error(error);
        }
    },



    // lister les utilisateurs - ADMIN
    async showAll(req, res) {

        try {
            const users = await User.findAll({
                order:['id'],
            });

            res.render('showUsers', {
                users: users
            });
        } catch (error) {
            console.error(error);
        }
    },

    // suprrimer un user - ADMIN
    async destroyOne(req, res) {

        try {
            const { id } = req.params;
            await User.destroy({
                where: {
                    id: id
                }
            });

            res.redirect('/admin/users');
        } catch (error) {
            console.error(error);
        }
    },


};

module.exports = userController;
