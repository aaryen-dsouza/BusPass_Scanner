import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';

const Role = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 25 }}> Select your role</Text>
            <Button title='Student' onPress={() => navigation.navigate('Login', { type: 'Student' })} />
            <Button title='Bus Faculty' onPress={() => navigation.navigate('Login', { type: 'Bus faculty' })} />
        </View>
    )
}

export default Role;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
