import * as ActionTypes from './actionTypes';

export const fetchBusFaculties = () => dispatch => {
    dispatch({
        type: ActionTypes.BUS_FACULTIES_LOADING
    })
    const token = localStorage.getItem('profile')
    return fetch('api/data/all', {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
            "type": "BUS_FACULTY"
        }
    })
        .then(response => response.json())
        .then(data => dispatch({ type: ActionTypes.BUS_FACULTIES_LOADED, payload: data.busFaculties }))
        .catch(err => console.log(err.message))
}