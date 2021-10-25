import * as ActionTypes from '../actions/actionTypes';

function students(state = {
    isLoading: true,
    students: []
}, action) {
    switch (action.type) {
        case ActionTypes.STUDENT_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case ActionTypes.STUDENT_LOADED:
            return {
                ...state,
                isLoading: false,
                students: action.payload
            }

        case ActionTypes.DELETE_STUDENT:
            return {
                ...state,
                isLoading: false,
                students: state.students.filter(student => student._id !== action.payload)
            }

        case ActionTypes.ADD_STUDENT:
            return {
                ...state,
                isLoading: false,
                students: [...state.students, action.payload]
            }

        default:
            return state;
    }

}

export default students;