import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalStyle } from 'client/style/base';
import { Routers } from './router';

const App = () => (
  <>
    <GlobalStyle />
    <Routers />
  </>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
