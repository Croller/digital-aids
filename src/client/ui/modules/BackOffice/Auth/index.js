import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'client/store/user';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const rootDispatch = useDispatch();
  const [t] = useTranslation();
  const { error } = useSelector(store => store.user);

  useEffect(() => {
    rootDispatch(login({ login: 'rootAdmin', password: 'dcfoodfans2021' }));
  }, []);

  useEffect(() => {
    if (error) {
      message.error(t(`common.errorCode.${error.key}`));
    }
  }, [error]);

  return (<>auth</>);
};

export default Auth;
