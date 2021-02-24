import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalStyle } from 'client/style/base';
import { InfoUser } from 'client/ui/components/_base/InfoUser';
import { Routers } from './router';

const App = () => (
  <>
    <InfoUser />
    <GlobalStyle />
    <Routers />
  </>
);

export default hot(App);
