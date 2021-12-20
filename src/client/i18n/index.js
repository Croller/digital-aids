import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const languages = {};

i18n
  .use(initReactI18next)
  .init({
    resources: languages,
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;
