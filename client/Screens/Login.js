import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, TextInput, Pressable } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { Input } from 'react-native-elements';

const Login = ({ route, navigation }) => {
    const [formData, setformData] = useState({
        email: '',
        password: ''
    })
    const type = route.params?.type;
    return (
        <View style={{ ...globalStyles.container, paddingHorizontal: 15 }}>
            <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 110, marginBottom: 60 }}>Login</Text>
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
                        <Button title={`Login as ${type}`} color='#000' onPress={() => navigation.navigate('Student')} />
                    </View>
                ) : (
                    <View style={styles.submitBtn}>
                        <Button title={`Login as ${type}`} color='#000' onPress={() => navigation.navigate('Bus-Faculty')} />
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
