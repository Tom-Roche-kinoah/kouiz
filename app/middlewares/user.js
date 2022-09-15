const userMiddleware = (req, res, next) => {
    if(req.session.user) { // Si j'ai un utilisateur dans les sessions

        // ici ça marche...pourquoi ?
        delete req.session.user.password;
        const dateFr = new Date(req.session.user.created_at).toLocaleDateString('fr-fr');
        req.session.user.created_at = dateFr;

        // Je le place dans res.locals
        res.locals.user = req.session.user;

        // RAPPEL : res.locals est un "sac à variable" qui est égalment passé à la vue
        // en plus de ce que l'on passe de manière structuré avec res.render
    } else {
        res.locals.user = false;
    }
    // console.log('session',req.session.user);
    // console.log('locals',res.locals.user);
    next();
};

module.exports = userMiddleware;