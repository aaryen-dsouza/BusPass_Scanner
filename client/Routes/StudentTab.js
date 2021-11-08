import React from 'react'
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QrCode from '../Screens/QrCode';
import VacancyOfSeats from '../Screens/VacancyOfSeats';
import AccountInfo from '../Screens/AccountInfo';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const StudentTab = () => {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator
            initialRouteName='QrCode'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 55
                },
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'QrCode') {
                        return (
                            focused ? <Ionicons name="qr-code-outline" size={28} color="black" /> : <Ionicons name="qr-code-outline" size={24} color="black" />
                        )
                    }

                    else if (route.name === 'VacancyOfSeats') {
                        return (
                            focused ? <FontAwesome name="bus" size={28} color="black" /> : <FontAwesome name="bus" size={24} color="black" />
                        )
                    }

                    else if (route.name === 'AccountInfo') {
                        return (
                            focused ? <MaterialIcons name="account-circle" size={30} color="black" /> : <MaterialIcons name="account-circle" size={26} color="black" />
                        )
                    }
                }


            })}>
            <Tabs.Screen name='QrCode' component={QrCode} />
            <Tabs.Screen name='VacancyOfSeats' component={VacancyOfSeats} />
            <Tabs.Screen name='AccountInfo' component={AccountInfo} />
        </Tabs.Navigator>
    )
}

export default StudentTab;
