import { combineReducers } from 'redux';
import auth from './auth';
import students from './students';
import busFaculties from './busFaculties';
import buses from './buses';


export default combineReducers({
    auth,
    students,
    busFaculties,
    buses
})