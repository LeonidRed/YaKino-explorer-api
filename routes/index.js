const router = require('express').Router();
const movieRoutes = require('./movies');
const userRoutes = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { signup, signin } = require('../controllers/users');
const { validateUserSignup, validateUserSignin } = require('../middlewares/validationUser');

router.post('/signup', validateUserSignup, signup); // регистрация
router.post('/signin', validateUserSignin, signin); // авторизация
router.use(auth);
router.use(userRoutes);
router.use(movieRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Такого пути не существует')));

module.exports = router;
