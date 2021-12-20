import React from 'react';
import { hot } from 'react-hot-loader/root';

import { Routers } from './router';

const App = () => (
  <Routers />
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
