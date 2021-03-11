import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from './de';
import en from './en';
import es from './es';
import fr from './fr';
import gr from './gr';
import it from './it';
import nor from './nor';
import ru from './ru';

export const languages = {
  de,
  en,
  es,
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
