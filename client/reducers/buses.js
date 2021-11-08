import * as ActionTypes from '../actions/types';

function buses(state = {
    isLoading: true,
    buses: [],
    isClicked: false
}, action) {
    switch (action.type) {
        case ActionTypes.BUSES_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case ActionTypes.BUSES_LOADED:
            return {
                ...state,
                isLoading: false,
                buses: action.payload
            }

        case ActionTypes.EDIT_BUS:
            return {
                ...state,
                isLoading: false,
                buses: state.buses.map(bus => bus._id === action.payload._id ? action.payload : bus),
                isClicked: true
            }

        case ActionTypes.ACCOUNT_SWITCH:
            return {
                ...state,
                isClicked: false
            }

        default:
            return state;
    }
}

export default buses;