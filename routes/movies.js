const movieRoutes = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/validationMovie');

// возвращает все сохранённые текущим пользователем фильмы
movieRoutes.get('/movies', getMovies);

// создаёт фильм с переданными в теле {data}
movieRoutes.post('/movies', validateMovie, createMovie);

// удаляет сохранённый фильм по id
movieRoutes.delete('/movies/:id', validateMovieId, deleteMovie);

module.exports = movieRoutes;
