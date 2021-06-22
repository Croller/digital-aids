import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { login, auth, logout } from 'client/store/user';
import translate from 'client/i18n';
import moment from 'moment';
import {
  initLocal,
  getLocalUser,
  setLocalUser,
} from 'client/utils/localStorage';

export const InfoUser = () => {
  const pathCurrent = '/back-office';
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
    restaurant: {},
  });
  const { token, enter_at } = useSelector(store => store.user.info);
  const { pathname } = location;

  const initStorage = () => {
    const localUser = getLocalUser() || storage;
    translate.changeLanguage(localUser.lng);
    localUser.token = localUser.token || token;
    localUser.enter_at = localUser.enter_at || enter_at;

    if (localUser.enter_at && enter_at && !initUrl) {
      const diffEnterTime = moment().diff(moment(localUser.enter_at, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'seconds');

      if (diffEnterTime > expireTime) {
        rootDispatch(logout());
        localUser.token = null;
      }
    }

    if (localUser.token && !token && [pathCurrent].some(f => pathname.indexOf(f) > -1)) {
      rootDispatch(auth({ token: localUser.token }));
      localUser.token = null;
      localUser.enter_at = null;
    }

    if (pathname.indexOf(pathCurrent) === -1) {
      rootDispatch(login({
        login: process.env.REST_GUEST_LOGIN,
        password: process.env.REST_GUEST_PASSWORD,
        language: localUser.lng,
      }));
    }
    
    if (process.env.NODE_ENV === 'development' && pathname.indexOf(pathCurrent) > -1) {
      rootDispatch(login({
        login: process.env.BACK_OFFICE_ADMIN_LOGIN,
        password: process.env.BACK_OFFICE_ADMIN_PASSWORD,
      }));
    }
    
    setLocalUser(localUser);
    setStorage({ ...storage, user: localUser });
    setInitUrl(pathname);
  };

  const updateStorage = () => {
    const local = { ...storage };
    local.user.token = token;
    local.user.enter_at = enter_at;
    setLocalUser(local.user);
    setStorage(local);
  };
  
  useEffect(() => {
    initLocal();
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
