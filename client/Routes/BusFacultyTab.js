import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QrScanner from '../Screens/QrScanner';
import AccountInfo from '../Screens/AccountInfo';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


const BusFacultyTab = () => {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 55
            },
            tabBarIcon: ({ focused }) => {
                if (route.name === 'QrScanner') {
                    return (
                        focused ? <MaterialCommunityIcons name="qrcode-scan" size={28} color="black" /> : <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
                    )
                }

                else if (route.name === 'AccountInfo') {
                    return (
                        focused ? <MaterialIcons name="account-circle" size={30} color="black" /> : <MaterialIcons name="account-circle" size={26} color="black" />
                    )
                }
            }
        })} initialRouteName='QrScanner'>
            <Tabs.Screen name='QrScanner' component={QrScanner} />
            <Tabs.Screen name='AccountInfo' component={AccountInfo} />
        </Tabs.Navigator>
    )
}

export default BusFacultyTab
