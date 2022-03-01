import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../baseUrl';


const Role = ({ navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const token = await AsyncStorage.getItem('profile');
        const type = await AsyncStorage.getItem('type');

        if (token && type) {
            if (type === 'Student') {
                fetch(baseUrl + 'api/auth/', {
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        "type": "STUDENT"
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            console.log(data.msg);
                        }
                        else {
                            dispatch({
                                type: 'LOAD_USER',
                                payload: data
                            })
                            navigation.navigate('Student')
                        }
                    })
                    .catch(err => console.log(err.message))
            }
            else {
                fetch(baseUrl + 'api/auth/', {
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        "type": "BUS_FACULTY"
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            console.log(data.msg);
                        }
                        else {
                            dispatch({
                                type: 'LOAD_USER',
                                payload: data
                            })
                            navigation.navigate('Bus-Faculty')
                        }
                    })
                    .catch(err => console.log(err.message))
            }
        }
    }
    return (
        <View style={{ ...globalStyles.container, alignItems: 'center' }}>

            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 24, marginTop: 190, marginBottom: 40, borderBottomWidth: 1, borderBottomColor: '#000' }}>Select your role</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login', { type: 'Student' })}>
                <Text style={styles.roleText}>Student</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login', { type: 'Bus Faculty' })}>
                <Text style={{ ...styles.roleText, paddingHorizontal: 80 }}>Bus Faculty</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Role;


const styles = StyleSheet.create({
    roleText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 22,
        elevation: 1,
        borderColor: '#000',
        paddingHorizontal: 100,
        paddingVertical: 10,
        marginBottom: 35
    }
});
