import * as ActionTypes from '../actions/actionTypes';

function buses(state = {
    isLoading: true,
    buses: []
}, action) {
    switch (action.type) {
        case ActionTypes.BUSES_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case ActionTypes.BUS_LOADED:
            return {
                ...state,
                isLoading: false,
                buses: action.payload
            }

        case ActionTypes.DELETE_BUS:
            return {
                ...state,
                isLoading: false,
                buses: state.buses.filter(bus => bus._id !== action.payload)
            }

        case ActionTypes.ADD_BUS:
            return {
                ...state,
                isLoading: false,
                buses: [...state.buses, action.payload]
            }

        case ActionTypes.EDIT_BUS:
            return {
                ...state,
                isLoading: false,
                buses: state.buses.map(bus => bus._id === action.payload._id ? action.payload : bus)
            }

        default:
            return state;
    }

}

export default buses;