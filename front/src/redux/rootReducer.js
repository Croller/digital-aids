import { combineReducers } from 'redux';
import app from './reducers';
import translation from './translation_reducers';

export default combineReducers(
  { app, translation },
);

