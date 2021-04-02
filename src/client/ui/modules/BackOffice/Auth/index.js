import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'client/store/user';

const Auth = () => {
  const rootDispatch = useDispatch();

  useEffect(() => {
    console.log('test');
    rootDispatch(login({ login: 'rootAdmin', password: 'dcfoodfans2021' }));
  });

  return (<>auth</>);
};

export default Auth;
