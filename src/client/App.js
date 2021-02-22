import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalStyle } from 'client/style/base';
import { BrowserRouter } from 'react-router-dom';
import { Routers } from './router';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Routers />
  </BrowserRouter>
);

export default hot(App);
