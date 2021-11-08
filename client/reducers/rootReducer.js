import { combineReducers } from 'redux';
import auth from './auth';
import buses from './buses';

export default combineReducers({
    auth,
    buses
})