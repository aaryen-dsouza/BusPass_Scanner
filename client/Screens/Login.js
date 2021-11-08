import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, TextInput, Pressable } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { useDispatch } from 'react-redux';

const Login = ({ route, navigation }) => {
    const [formData, setformData] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch();
    const [error, seterror] = useState(null);
    const type = route.params?.type;

    const handleSubmit = () => {
        seterror(null);
        if (type === 'Student') {
            const formF = {
                ...formData,
                type: 'STUDENT'
            }
            return fetch('http://192.168.0.108:3001/api/auth/', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formF)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        seterror(data.msg);
                    }
                    else {
                        dispatch({
                            type: 'AUTH',
                            payload: data
                        })
                        setformData({
                            email: '',
                            password: ''
                        })
                        seterror(null);
                        navigation.navigate('Student');
                        console.log('Student login success.')

                    }
                })
                .catch(err => console.log(err.message))
        }
        else {
            const formF = {
                ...formData,
                type: 'BUS_FACULTY'
            }
            return fetch('http://192.168.0.108:3001/api/auth/', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formF)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        seterror(data.msg);
                    }
                    else {
                        dispatch({
                            type: 'AUTH',
                            payload: data
                        })
                        setformData({
                            email: '',
                            password: ''
                        })
                        seterror(null);
                        navigation.navigate('Bus-Faculty');
                        console.log('Faculty login success.')
                    }
                })
                .catch(err => console.log(err.message))
        }
    }
    return (
        <View style={{ ...globalStyles.container, paddingHorizontal: 15 }}>
            <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 110, marginBottom: 40 }}>Login</Text>
            {
                error && (
                    <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10, marginBottom: 10, color: '#ff0000' }}>{error}</Text>
                )
            }

            {/* <Text>{route.params?.type}</Text> */}
            <View>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 18 }}>Email</Text>
                <TextInput
                    placeholder='Enter your registered email'
                    value={formData.email}
                    onChangeText={(val) => setformData({ ...formData, email: val })}
                    style={styles.inputStyle}
                />
            </View>
            <View>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 18 }}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholder='Enter your password'
                    value={formData.password}
                    onChangeText={(val) => setformData({ ...formData, password: val })}
                    style={styles.inputStyle}
                />
            </View>


            {
                type === 'Student' ? (
                    <View style={styles.submitBtn}>
                        <Button title={`Login as ${type}`} color='#000' onPress={handleSubmit} />
                    </View>
                ) : (
                    <View style={styles.submitBtn}>
                        <Button title={`Login as ${type}`} color='#000' onPress={handleSubmit} />
                    </View>
                )
            }
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Text style={styles.roleText}>Select your role</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    inputStyle: {
        marginBottom: 25,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginTop: 10
    },
    roleText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginTop: 20
    },
    submitBtn: {
        borderRadius: 50,
        marginTop: 10,
        backgroundColor: '#000',
    }
})
