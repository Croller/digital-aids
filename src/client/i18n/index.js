import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = require('./en.json');
const es = require('./es.json');
const de = require('./de.json');
const fr = require('./fr.json');
const gr = require('./gr.json');
const it = require('./it.json');
const nor = require('./nor.json');
const ru = require('./ru.json');

export const languages = {
  en,
  es,
  de,
  fr,
  gr,
  it,
  nor,
  ru,
};

i18n
  .use(initReactI18next)
  .init({
    resources: languages,
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;
