const isAdmin = (req, res, next) => {
    if(!req.session.user || req.session.user.role !== 'admin') {
        console.error('acces refusé : non admin');
        return res.redirect('/');
    }
    next();
};

const isUser = (req, res, next) => {
    // un admin a aussi les droits du user
    if(req.session.user && req.session.user.role === 'user') {
        next();
        return;
    }
    if(req.session.user && req.session.user.role === 'admin') {
        next();
        return;
    }

    console.error('acces refusé : non user');
    return res.redirect('/');
};

module.exports = { isAdmin, isUser };