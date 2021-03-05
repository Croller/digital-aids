import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = require('./en.json');
const es = require('./es.json');

export const languages = {
  en,
  es,
};

i18n
  .use(initReactI18next)
  .init({
    resources: languages,
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;
