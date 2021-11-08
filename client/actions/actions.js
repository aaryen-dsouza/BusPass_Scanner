import * as ActionTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export const fetchBuses = () => dispatch => {
    const user = useSelector(state => state.auth.authData);
    const userInfo = user.type === 'Student' ? user.student : user.busFaculty;
    const busBranch = userInfo.busBranch;

    const token = AsyncStorage.getItem('profile')
    return fetch('http://192.168.0.108:3001/api/data/' + busBranch, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
            "type": "BUS_INFO"
        }
    })
        .then(response => response.json())
        .then(data => dispatch({ type: ActionTypes.BUS_LOADED, payload: data.buses }))
        .catch(err => console.log(err.message))
}

