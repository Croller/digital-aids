import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import en from './en';
// import ru from './ru';

export const languages = {
  // en,
  // ru,
};

i18n
  .use(initReactI18next)
  .init({
    resources: languages,
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;
