const express = require('express');
const mainController = require('./../controllers/mainController');
const questionController = require('./../controllers/questionController');
const quizController = require('./../controllers/quizController');
const tagController = require('./../controllers/tagControlleur');
const userController = require('./../controllers/userController');
const {isAdmin, isUser} = require('../middlewares/isRole');

const router = express.Router();

// home
router.get('/', mainController.homePage);

// categories (tags)
router.get('/categories', tagController.list);
router.get('/category/:id', tagController.quizListByTag);

// user
router.get('/register', userController.index);
router.post('/register', userController.register);
router.get('/login', userController.login);
router.post('/login', userController.loginAction);
router.get('/profile', isUser, userController.profile);
router.get('/logout', isUser, userController.logout);


// quiz
router.get('/quiz/:id', quizController.showOne);

// -----------------------------
// admin
router.get('/admin/users', isAdmin, userController.showAll);
router.get('/admin/destroyUser/:id', isAdmin, userController.destroyOne);
router.get('/admin/profile/:id', isAdmin, userController.profileById);

// question
router.get('/admin/question/:id', isAdmin, questionController.showOne);
router.get('/admin/questions', isAdmin, questionController.showAll);
router.get('/admin/add-question', isAdmin, questionController.addQuestion);
router.post('/admin/add-question', isAdmin, questionController.saveQuestion);

module.exports = router;