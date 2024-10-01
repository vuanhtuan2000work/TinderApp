import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../../screens/Splash';
import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';

const Stack = createNativeStackNavigator();

const NoAuth = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default NoAuth
