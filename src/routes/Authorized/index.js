import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AddInformationsRoute from '../AddInformations';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_URL } from '@env';
import { AuthenticatedUserContext } from '..';
import WelcomeScreen from '../../screens/WelcomeScreen';
import TabBarRoute from '../TabBarRoute';

const Stack = createNativeStackNavigator();

const Authorized = () => {
    const { user } = useContext(AuthenticatedUserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const checkUserInfo = async () => {
            if (user) {
                try {
                    const userRef = firebase.app().database(DATABASE_URL).ref(`/users/${user.uid}/userInfor`);
                    const userSnapshot = await userRef.once('value');
                    const userData = userSnapshot.val();
                    if (!userData || !userData.dateOfBirth || !userData.name || !userData.interests || !userData.photos) {
                        navigation.navigate('WelcomeScreen'); 
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        checkUserInfo();
    }, [user, navigation]);

    return (
        <Stack.Navigator initialRouteName="TabBarRoute">
            <Stack.Screen name="TabBarRoute" component={TabBarRoute} options={{ headerShown: false }} />
            <Stack.Screen name="AddInformationsRoute" component={AddInformationsRoute} options={{ headerShown: false }} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Authorized;
