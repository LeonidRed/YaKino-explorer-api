const Movie = require('../models/movie');
const { CREATED } = require('../utils/errors');
const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const ForbiddeErr = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const data = req.body;
  Movie.create({ ...data, owner: req.user._id })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Переданы некорректные данные в метод создания фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddeErr('У вас нет прав на удаление этого фильма');
      } else {
        return Movie.findByIdAndRemove(req.params.id).then(() => res.send({ message: 'Фильм удален' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
