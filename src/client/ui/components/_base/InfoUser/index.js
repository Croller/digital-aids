import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { login, auth, logout } from 'client/store/user';
import translate from 'client/i18n';
import moment from 'moment';

import {
  getLocalStorage,
  setLocalStorage,
} from 'client/utils/localStorage';

export const InfoUser = () => {
  const pathAuth = 'back-office';
  const storageKey = process.env.LOCAL_STORAGE_KEY;
  const lng = navigator.language || navigator.userLanguage;
  const expireTime = process.env.SERVER_AUTH_TIME.replace('h', '') * 60 * 60;
  const rootDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [initUrl, setInitUrl] = useState(null);
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
  const { pathname } = location;

  const initStorage = () => {
    const local = getLocalStorage(storageKey) || storage;
    translate.changeLanguage(local.user.lng);
    local.user.token = local.user.token || token;
    local.user.enter_at = local.user.enter_at || enter_at;

    if (local.user.enter_at && enter_at && !initUrl) {
      const diffEnterTime = moment().diff(moment(local.user.enter_at, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'seconds');

      if (diffEnterTime > expireTime) {
        rootDispatch(logout());
        local.user.token = null;
      }
    }

    if (local.user.token && !token && pathname.indexOf(pathAuth) > -1) {
      rootDispatch(auth({ token: local.user.token }));
    } else if (process.env.NODE_ENV === 'development') {
      rootDispatch(login({
        login: process.env.BACK_OFFICE_ADMIN_LOGIN,
        password: process.env.BACK_OFFICE_ADMIN_PASSWORD,
      }));
    }
    
    setLocalStorage(storageKey, local);
    setStorage(local);
    setInitUrl(pathname);
  };
  
  useEffect(() => {
    if (['back-office'].find(f => pathname.indexOf(f) > -1)) {
      console.log('Url enter:', pathname);
      initStorage();
    }
    return () => {
      console.log('Logout before close');
      rootDispatch(logout());
    };
  }, []);

  useEffect(() => {
    if (token && initUrl) {
      const url = initUrl.indexOf('auth') > -1 ? `/${pathAuth}/restaurants` : initUrl;
      history.push(url);
    }
  }, [token, initUrl]);

  return (<></>);
};
