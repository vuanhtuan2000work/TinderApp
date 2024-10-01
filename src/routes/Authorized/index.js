import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBarRoute from '../TabBarRoute';
import AddInformationsRoute from '../AddInformations';

const Stack = createNativeStackNavigator();

const Authorized = () => {
    return (
        <Stack.Navigator initialRouteName="TabBarRoute">
            <Stack.Screen name="AddInformationsRoute" component={AddInformationsRoute} options={{ headerShown: false }} />
            <Stack.Screen name="TabBarRoute" component={TabBarRoute} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Authorized
