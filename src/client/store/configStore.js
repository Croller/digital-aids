import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const composeEnhancers = composeWithDevTools({
  serialize: true,
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
}
