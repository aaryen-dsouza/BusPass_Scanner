import React from 'react';
import { View, Text, Button } from 'react-native';


const Student = ({ navigation }) => {

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text>Student Home</Text>
            <Button title='Logout' onPress={() => navigation.navigate('Role')} />
        </View>
    )
}

export default Student;
