import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalStyle } from 'client/style/base';
import { Routers } from './router';
import 'antd/dist/antd.css';

const App = () => (
  <>
    <GlobalStyle />
    <Routers />
  </>
);

export default hot(App);
