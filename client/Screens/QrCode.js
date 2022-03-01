import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
// import { fetchBuses } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../styles/globalStyles';
import { baseUrl } from '../baseUrl';

const QrCode = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.authData);
    const userInfo = user.type === 'Student' ? user.student : user.busFaculty;
    const busBranch = userInfo.busBranch;
    useEffect(() => {
        fetchBuses();
    }, [])

    const fetchBuses = async () => {
        const token = await AsyncStorage.getItem('profile')
        return fetch(baseUrl + 'api/data/' + busBranch, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
                "type": "BUS_INFO"
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'BUSES_LOADED',
                    payload: data.buses
                })
            })
            .catch(err => console.log(err.message))
    }
    const name = userInfo.name;
    const namef = name.toUpperCase()
    return (
        <View style={{ ...globalStyles.container, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 25 }}>  Scan this QR Code</Text>
            <QRCode
                value={JSON.stringify(userInfo)}
                size={240}
            />
            <Text style={{ fontSize: 20, marginTop: 30 }}>{namef}</Text>
        </View>
    )
}

export default QrCode
