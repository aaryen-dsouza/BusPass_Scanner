import React from 'react'
import { View, Text } from 'react-native'

const Header = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center'
        }}>
            <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 20 }}>Bus Pass Scanner</Text>
        </View>
    )
}

export default Header;
