import * as ActionTypes from '../actions/actionTypes';

function auth(state = { authData: null }, action) {
    switch (action.type) {
        case ActionTypes.AUTH:
            localStorage.setItem('profile', action?.payload.token)
            return {
                ...state,
                authData: action?.payload
            }

        case ActionTypes.LOGOUT:
            localStorage.clear();
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