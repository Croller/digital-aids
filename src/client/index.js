import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import 'antd/dist/antd.css';
import App from './App';
import i18n from './i18n';

const store = configureStore();

const root = (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));

