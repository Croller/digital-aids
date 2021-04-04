import { detect } from 'detect-browser';
import translate from 'client/i18n';

import {
  getLocalStorage,
  setLocalStorage,
} from 'client/utils/localStorage';

export const InfoUser = () => {
  const key = 'DigitalCarte';
  const browser = { ...detect() };
  const lng = navigator.language || navigator.userLanguage;
  const local = getLocalStorage(key);
  const storage = {
    user: {
      lng,
      cookies: false,
    },
    restaurant: {
      offersViewed: [],
    },
    browser,
  };

  if (!local) {
    storage.browser = browser;
    setLocalStorage(key, storage);
  } else {
    translate.changeLanguage(local.user.lng);
  }
};
