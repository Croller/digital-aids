import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { login, auth, set } from 'client/store/user';
import translate from 'client/i18n';
import {
  initLocal,
  setLocal,
} from 'client/utils/localStorage';

const PATH = '/back-office';

export const InfoUser = () => {
  const rootDispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const [initUrl, setInitUrl] = useState(null);
  const { info } = useSelector(s => s.user);
  const { token } = info;

  const initStorage = () => {
    const storage = initLocal();
    translate.changeLanguage(storage.lng);

    setLocal({ token });
    setInitUrl(pathname);

    if ((storage.token || token) && [PATH].some(f => pathname.indexOf(f) > -1)) {
      rootDispatch(auth({ token: storage.token }));
      return null;
    }
    
    if (pathname.indexOf(PATH) === -1) {
      rootDispatch(login({
        login: process.env.GUEST_LOGIN,
        password: process.env.GUEST_PASSWORD,
      }));
      return null;
    }

    if (process.env.NODE_ENV === 'development' && pathname.indexOf(PATH) > -1) {
      rootDispatch(login({
        login: process.env.ROOT_LOGIN,
        password: process.env.ROOT_PASSWORD,
      }));
      return null;
    }
  };

  const logout = () => {
    rootDispatch(set({ info: { ...info, token: null } }));
    setLocal({ token: null });
  };
  
  useEffect(() => {
    initStorage();
    
    return () => {
      logout();
    };
  }, []);

  useEffect(() => {
    if (token && initUrl) {
      const url = initUrl.indexOf('auth') > -1 ? `${PATH}/restaurants` : initUrl;
      setLocal({ token });
      history.push(url);
    }
    if (info.login === process.env.GUEST_LOGIN && pathname.indexOf(PATH) > -1) {
      logout();
    }
  }, [token, initUrl]);

  return (<></>);
};
