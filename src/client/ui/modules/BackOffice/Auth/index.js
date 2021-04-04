import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'client/store/user';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const rootDispatch = useDispatch();
  const [t] = useTranslation();

  useEffect(() => {
    rootDispatch(login({ login: 'rootAdmin', password: 'dcfoodfans2021' }));
  }, []);

  return (<>auth</>);
};

export default Auth;
