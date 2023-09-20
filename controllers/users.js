require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');
const BAD_REQUEST_MESSAGE = require('../utils/constants');
const NOT_FOUND_MESSAGE = require('../utils/constants');
const CONFLICT_MESSAGE = require('../utils/constants');

const { CREATED } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BAD_REQUEST_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictErr(CONFLICT_MESSAGE));
      } else {
        next(err);
      }
    });
};

const signup = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      res.status(CREATED).send({
        token,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BAD_REQUEST_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictErr(CONFLICT_MESSAGE));
      } else {
        next(err);
      }
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser, updateUser, signin, signup,
};
