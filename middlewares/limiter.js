const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 10000,
  windowMs: 150 * 60 * 10000,
  message: 'Слишком частые запросы с Вашего IP',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
