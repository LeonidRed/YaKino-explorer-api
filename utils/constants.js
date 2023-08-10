const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const FORBIDDE_MESSAGE = 'У вас нет прав на удаление этого фильма';
const NOT_FOUND_MESSAGE = 'Пользователь с указанным _id не найден';
const CONFLICT_MESSAGE = 'Такой email адрес уже зарегистрирован';
const UNAUTH_MESSAGE = 'Необходима авторизация';
const INTERNAL_SERVER_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  URL_REGEXP,
  BAD_REQUEST_MESSAGE,
  FORBIDDE_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_MESSAGE,
  UNAUTH_MESSAGE,
  INTERNAL_SERVER_MESSAGE,
};
