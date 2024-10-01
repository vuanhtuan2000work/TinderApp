import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from '../../screens/Chat';
import WaitingRoom from '../../screens/Chat/WaitingRoom';

const Stack = createNativeStackNavigator();

const Chat = () => {
    return (
        <Stack.Navigator initialRouteName="WaitingRoom">
            <Stack.Screen name="WaitingRoom" component={WaitingRoom} options={{ headerShown: false }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    )
}

export default Chat
