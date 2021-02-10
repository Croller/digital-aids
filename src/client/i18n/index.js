import i18n from 'i18next';

const en = require('./en.json');
const ru = require('./ru.json');

i18n.init({
  fallbackLng: 'ru',
  ns: ['translations'],
  defaultNS: 'translations',
  resources: {
    en,
    ru,
  },
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  // react i18next special options (optional)
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
});

export default i18n;
