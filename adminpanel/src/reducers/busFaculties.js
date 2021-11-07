import * as ActionTypes from '../actions/actionTypes';

function busFaculties(state = {
    isLoading: true,
    busFaculties: []
}, action) {
    switch (action.type) {
        case ActionTypes.BUS_FACULTIES_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case ActionTypes.BUS_FACULTIES_LOADED:
            return {
                ...state,
                isLoading: false,
                busFaculties: action.payload
            }

        case ActionTypes.DELETE_BUS_FACULTY:
            return {
                ...state,
                isLoading: false,
                busFaculties: state.busFaculties.filter(faculty => faculty._id !== action.payload)
            }

        case ActionTypes.ADD_BUS_FACULTY:
            return {
                ...state,
                isLoading: false,
                busFaculties: [...state.busFaculties, action.payload]
            }

        case ActionTypes.EDIT_BUS_FACULTY:
            return {
                ...state,
                isLoading: false,
                busFaculties: state.busFaculties.map(faculty => faculty._id === action.payload._id ? action.payload : faculty)
            }

        default:
            return state;
    }

}

export default busFaculties;