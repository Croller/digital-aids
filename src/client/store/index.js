import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const composeEnhancers = composeWithDevTools({
  serialize: true,
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(...[sagaMiddleware])),
  );
  sagaMiddleware.run(sagas);
  return store;
}
