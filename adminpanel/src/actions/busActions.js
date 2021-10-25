import * as ActionTypes from './actionTypes';

export const fetchBuses = () => dispatch => {
    dispatch({
        type: ActionTypes.BUSES_LOADING
    })
    const token = localStorage.getItem('profile')
    return fetch('api/bus_info/data/all', {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => dispatch({ type: ActionTypes.BUS_LOADED, payload: data.buses }))
        .catch(err => console.log(err.message))
}