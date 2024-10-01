import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes, { AuthenticatedUserProvider } from './src/routes';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthenticatedUserProvider>

  );
}

export default App;