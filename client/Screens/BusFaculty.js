import React from 'react';
import { View, Text, Button } from 'react-native';

const BusFaculty = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text>Bus Faculty</Text>
            <Button title='Logout' onPress={() => navigation.navigate('Role')} />
        </View>
    )
}

export default BusFaculty
