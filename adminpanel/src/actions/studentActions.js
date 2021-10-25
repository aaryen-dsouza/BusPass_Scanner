
import * as ActionTypes from './actionTypes';

export const fetchStudents = () => dispatch => {
    dispatch({
        type: ActionTypes.STUDENT_LOADING
    })
    const token = localStorage.getItem('profile')
    return fetch('api/students/data/all', {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => dispatch({ type: ActionTypes.STUDENT_LOADED, payload: data.students }))
        .catch(err => console.log(err.message))
}