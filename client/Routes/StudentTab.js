import React from 'react'
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QrCode from '../Screens/QrCode';
import VacancyOfSeats from '../Screens/VacancyOfSeats';
import AccountInfo from '../Screens/AccountInfo';
import Header from '../Screens/Header';

const StudentTab = () => {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator initialRouteName='QrCode' screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='QrCode' component={QrCode} />
            <Tabs.Screen name='VacancyOfSeats' component={VacancyOfSeats} />
            <Tabs.Screen name='AccountInfo' component={AccountInfo} />
        </Tabs.Navigator>
    )
}

export default StudentTab
