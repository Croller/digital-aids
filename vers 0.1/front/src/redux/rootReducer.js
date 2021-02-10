import app from './reducers';
import translation from './translation_reducers'
import { combineReducers } from 'redux';


export default combineReducers(
    {app, translation}
)

