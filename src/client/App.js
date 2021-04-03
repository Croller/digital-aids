import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalStyle } from 'client/style/base';
import { InfoUser } from 'client/ui/components/_base/InfoUser';
import { Routers } from './router';
import 'antd/dist/antd.css';

InfoUser();

const App = () => (
  <>
    <GlobalStyle />
    <Routers />
  </>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
