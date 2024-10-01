import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddName from '../../screens/AddInformations';
import AddDOB from '../../screens/AddInformations/AddDOB';
import AddGender from '../../screens/AddInformations/AddGender';
import AddInterests from '../../screens/AddInformations/AddInterests';
import AddPhotos from '../../screens/AddInformations/AddPhotos';
import WelcomeScreen from '../../screens/WelcomeScreen';
import ChooseTargetGender from '../../screens/AddInformations/ChooseTargetGender';


const Stack = createNativeStackNavigator();

const AddInformationsRoute = () => {
    return (
        <Stack.Navigator initialRouteName="AddName">
            <Stack.Screen name="AddName" component={AddName} options={{ headerShown: false }} />
            <Stack.Screen name="AddDOB" component={AddDOB} options={{ headerShown: false }} />
            <Stack.Screen name="AddGender" component={AddGender} options={{ headerShown: false }} />
            <Stack.Screen name="AddInterests" component={AddInterests} options={{ headerShown: false }} />
            <Stack.Screen name="AddPhotos" component={AddPhotos} options={{ headerShown: false }} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseTargetGender" component={ChooseTargetGender} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AddInformationsRoute
