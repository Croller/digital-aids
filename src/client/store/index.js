import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = composeWithDevTools({
    serialize: true,
  });
  const compose = process.env.NODE_ENV === 'production'
    ? applyMiddleware(...[sagaMiddleware])
    : composeEnhancers(applyMiddleware(...[sagaMiddleware]));

  const store = createStore(
    combineReducers(reducers),
    compose,
  );
  sagas.forEach((saga) => {
    sagaMiddleware.run(saga);
  });
  return store;
}
