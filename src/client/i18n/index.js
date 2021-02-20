import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = require('./en.json');

const resources = {
  en,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;
