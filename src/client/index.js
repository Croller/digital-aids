import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from 'react-modal-hook';
import * as serviceWorker from 'client/utils/service-worker';
import configureStore from './store';
import App from './App';
import i18n from './i18n';
import 'antd/dist/antd.css';

const store = configureStore();

const root = (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));

serviceWorker.register();
