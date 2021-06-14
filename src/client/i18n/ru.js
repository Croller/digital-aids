const backOffice = require('./BackOffice/ru.json');
const restaurant = require('./Restaurant/ru.json');
const present = require('./Present/ru.json');
const common = require('./Common/ru.json');

export default {
  name: 'Русский',

  translation: {
    backOffice,
    restaurant,
    present,
    common,
  },
};
