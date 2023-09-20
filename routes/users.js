const userRoutes = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/validationUser');

// возвращает информацию о пользователе (email и имя)
userRoutes.get('/users/me', getUser);

// обновляет информацию о пользователе (email и имя)
userRoutes.patch('/users/me', validateUserUpdate, updateUser);

module.exports = userRoutes;
