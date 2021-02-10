import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import configureStore from './store/configStore';
import App from './App';
import i18n from './i18n';

const store = configureStore();

const root = (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App i18n={i18n} />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));

// if (process.env.NODE_ENV === 'development') {
//   store.subscribe(() => {
//     console.log('subscribe', store.getState());
//   });
// }
