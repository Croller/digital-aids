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
  const pathCurrent = '/back-office';
  const storageKey = process.env.LOCAL_STORAGE_KEY;
  const lng = navigator.language || navigator.userLanguage || 'en-EN';
  const expireTime = process.env.SERVER_AUTH_TIME.replace('h', '') * 60 * 60;
  const rootDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [initUrl, setInitUrl] = useState(null);
  const [storage, setStorage] = useState({
    user: {
      lng: lng.slice(0, 2),
      cookies: false,
      token: null,
      enter_at: null,
      check18: false,
      checkDaily: false,
    },
    restaurant: {
      tableNumber: 0,
      offersViewed: [],
      opinionSend: false,
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

    if (local.user.token && !token && [pathCurrent].some(f => pathname.indexOf(f) > -1)) {
      rootDispatch(auth({ token: local.user.token }));
      local.user.token = null;
      local.user.enter_at = null;
    }

    if (pathname.indexOf('/restaurant') > -1 && pathname.indexOf(pathCurrent) === -1) {
      rootDispatch(login({
        login: process.env.REST_GUEST_LOGIN,
        password: process.env.REST_GUEST_PASSWORD,
        language: local.user.lng,
      }));
    }
    
    // if (process.env.NODE_ENV === 'development' && pathname.indexOf(pathCurrent) > -1) {
    //   rootDispatch(login({
    //     login: process.env.BACK_OFFICE_ADMIN_LOGIN,
    //     password: process.env.BACK_OFFICE_ADMIN_PASSWORD,
    //   }));
    // }
    
    setLocalStorage(storageKey, local);
    setStorage(local);
    setInitUrl(pathname);
  };

  const updateStorage = () => {
    const local = { ...storage };
    local.user.token = token;
    local.user.enter_at = enter_at;
    setLocalStorage(storageKey, local);
    setStorage(local);
  };
  
  useEffect(() => {
    console.log('Url enter:', pathname);
    initStorage();
    
    return () => {
      console.log('Logout before close');
      rootDispatch(logout());
    };
  }, []);

  useEffect(() => {
    if (token && initUrl) {
      const url = initUrl.indexOf('auth') > -1 ? `${pathCurrent}/restaurants` : initUrl;
      updateStorage();
      history.push(url);
    }
  }, [token, initUrl]);

  return (<></>);
};
