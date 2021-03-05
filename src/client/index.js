import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from 'react-modal-hook';
import configureStore from './store';
import App from './App';
import i18n from './i18n';

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

