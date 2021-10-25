import React from 'react'
import { View, Text, Button } from 'react-native'

const AccountInfo = ({ navigation }) => {
    return (
        <View>
            <Text>Account Info</Text>
            <Button title='Logout' onPress={() => navigation.navigate('Role')} />
        </View>
    )
}

export default AccountInfo
