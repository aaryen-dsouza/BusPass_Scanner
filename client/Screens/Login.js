import React from 'react'
import { View, Text, Button } from 'react-native'

const Login = ({ route, navigation }) => {
    const type = route.params?.type;
    return (
        <View>
            <Text>Login</Text>
            <Text>{route.params?.type}</Text>

            {
                type === 'Student' ? (
                    <Button title={`Login as ${type}`} onPress={() => navigation.navigate('Student')} />
                ) : (
                    <Button title={`Login as ${type}`} onPress={() => navigation.navigate('Bus-Faculty')} />
                )
            }
            <Button title='Select your role' onPress={() => navigation.goBack()} />
        </View>
    )
}

export default Login
