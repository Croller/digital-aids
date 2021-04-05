import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, logout } from 'client/store/user';
import translate from 'client/i18n';
import moment from 'moment';

import {
  getLocalStorage,
  setLocalStorage,
} from 'client/utils/localStorage';

export const InfoUser = () => {
  const key = 'DigitalCarte';
  const lng = navigator.language || navigator.userLanguage;
  const expireTime = process.env.SERVER_AUTH_TIME.replace('h', '') * 60 * 60;
  const rootDispatch = useDispatch();
  const [storage, setStorage] = useState({
    user: {
      lng: lng || 'en',
      cookies: false,
      token: null,
      enter_at: null,
    },
    restaurant: {
      offersViewed: [],
    },
  });
  const { token, enter_at } = useSelector(store => store.user.info);

  const initStorage = () => {
    const local = getLocalStorage(key) || storage;
    translate.changeLanguage(local.user.lng);
    local.user.token = local.user.token || token;
    local.user.enter_at = local.user.enter_at || enter_at;

    if (local.user.enter_at && enter_at) {
      const diffEnterTime = moment().diff(moment(local.user.enter_at, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'seconds');
      if (diffEnterTime > expireTime) {
        rootDispatch(logout());
      }
    }

    if (local.user.token && !token) {
      rootDispatch(auth({ token: local.user.token }));
    }
    
    setLocalStorage(key, local);
    setStorage(local);
  };
  
  useEffect(() => {
    initStorage();
  }, [token]);

  return (<></>);
};
