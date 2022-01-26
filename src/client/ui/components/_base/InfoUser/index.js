import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { login, auth, set } from 'client/store/user';
import translate from 'client/i18n';
import moment from 'moment';
import {
  initLocal,
  getLocalUser,
  setLocalUser,
} from 'client/utils/localStorage';

const PATH = '/back-office';

export const InfoUser = () => {
  const lng = navigator.language || navigator.userLanguage || 'en-EN';
  const expireTime = process.env.SERVER_AUTH_TIME.replace('h', '') * 60 * 60;
  const rootDispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
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
  const { info } = useSelector(s => s.user);
  const { token, enter_at } = info;

  const initStorage = () => {
    const localUser = getLocalUser() || storage;
    translate.changeLanguage(localUser.lng);
    localUser.token = localUser.token || token;
    localUser.enter_at = localUser.enter_at || enter_at;

    if (localUser.enter_at && enter_at && !initUrl) {
      const diffEnterTime = moment().diff(moment(localUser.enter_at, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'seconds');

      if (diffEnterTime > expireTime) {
        rootDispatch(set({ info: { ...info, token } }));
        localUser.token = null;
      }
    }

    if (localUser.token && !token && [PATH].some(f => pathname.indexOf(f) > -1)) {
      rootDispatch(auth({ token: localUser.token, language: localUser.lng }));
      localUser.token = null;
      localUser.enter_at = null;
    }

    if (pathname.indexOf(PATH) === -1) {
      rootDispatch(login({
        login: process.env.GUEST_LOGIN,
        password: process.env.GUEST_PASSWORD,
        language: localUser.lng,
      }));
    }
    
    if (process.env.NODE_ENV === 'development' && pathname.indexOf(PATH) > -1) {
      rootDispatch(login({
        login: process.env.ROOT_LOGIN,
        password: process.env.ROOT_PASSWORD,
        language: localUser.lng,
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

  const logout = () => {
    const localUser = getLocalUser();
    rootDispatch(set({ info: { ...info, token } }));
    setLocalUser({ ...localUser, token: null, enter_at: null });
  };
  
  useEffect(() => {
    initLocal();
    console.log('Url enter:', pathname);
    initStorage();
    
    return () => {
      console.log('Logout before close');
      logout();
    };
  }, []);

  useEffect(() => {
    if (token && initUrl) {
      const url = initUrl.indexOf('auth') > -1 ? `${PATH}/restaurants` : initUrl;
      updateStorage();
      history.push(url);
    }
    if (info.login === process.env.GUEST_LOGIN && pathname.indexOf(PATH) > -1) {
      logout();
    }
  }, [token, initUrl]);

  return (<></>);
};
