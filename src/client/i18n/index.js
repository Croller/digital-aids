import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from './de';
import en from './en';
import es from './es';
import fr from './fr';
import gr from './gr';
import it from './it';
import no from './no';
import ru from './ru';

export const languages = {
  de,
  en,
  es,
  fr,
  gr,
  it,
  no,
  ru,
};

i18n
  .use(initReactI18next)
  .init({
    resources: languages,
    lng: 'es',
    fallbackLng: 'es',
  });

export default i18n;
