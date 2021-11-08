
import React from 'react';
import { useFonts } from 'expo-font';
import Role from './Screens/Role';
import Loading from './Screens/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Screens/Login';
import StudentTab from './Routes/StudentTab';
import BusFacultyTab from './Routes/BusFacultyTab';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './store';



export default function App() {

  const Stack = createNativeStackNavigator();

  let [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/Fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/Fonts/Nunito-Bold.ttf')
  })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Role' screenOptions={{
              title: 'Bus Pass Scanner',
              headerBackVisible: false,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'Nunito-Bold'
              }
            }}>
              <Stack.Screen name='Role' component={Role} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Student' component={StudentTab} />
              <Stack.Screen name='Bus-Faculty' component={BusFacultyTab} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    )
  }
}

