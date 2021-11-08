import * as ActionTypes from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

function auth(state = { authData: null }, action) {
    switch (action.type) {
        case ActionTypes.AUTH:
            AsyncStorage.setItem('profile', action?.payload.token);
            AsyncStorage.setItem('type', action?.payload.type);
            return {
                ...state,
                authData: action?.payload
            }

        case ActionTypes.LOGOUT:
            AsyncStorage.clear();
            return {
                ...state,
                authData: null
            }

        case ActionTypes.LOAD_USER:
            return {
                ...state,
                authData: action.payload
            }

        default:
            return state
    }
}

export default auth;