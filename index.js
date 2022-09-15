// variables d'environnement
require('dotenv').config();

// modules natifs
const path = require('path');
const express = require('express');
const session = require('express-session');

// modules persos
const router = require('./app/router/');
const userMiddleware = require('./app/middlewares/user');

const app = express();

// template engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

// statics
app.use(express.static(path.join(__dirname, './assets')));

// session
app.use(session({
    secret: process.env.SESSION_SECRET || 'miaou',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // http, not https for now
        maxAge: 1000 * 60 * 60 // session duration
    }
}));

// app.use(function(req, res, next) {
//     if (!req.session.user) {
//         req.session.user = {
//             page: '',
//         };
//     }
//     next();
// });


app.use(userMiddleware);

app.locals.page = 'home';

// pour avoir accès à req.body
app.use(express.urlencoded({ extended: false }));



app.use(router);




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});