import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalStyle } from 'client/style/base';
import { InfoUser } from 'client/ui/components/_base/InfoUser';
import { ErrorMessage } from 'client/ui/components/_base/ErrorMessage';

import { Routers } from './router';

InfoUser();

const App = () => (
  <>
    <GlobalStyle />
    <Routers />
    <ErrorMessage />
  </>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
