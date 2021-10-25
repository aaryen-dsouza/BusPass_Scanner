import React from 'react'
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QrScanner from '../Screens/QrScanner';
import AccountInfo from '../Screens/AccountInfo';
import Header from '../Screens/Header';

const BusFacultyTab = () => {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='QrScanner'>
            <Tabs.Screen name='QrScanner' component={QrScanner} />
            <Tabs.Screen name='AccountInfo' component={AccountInfo} />
        </Tabs.Navigator>
    )
}

export default BusFacultyTab
