import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useEffect, useState, useContext } from 'react';
import NoAuth from './NoAuth';
import TabBarRoute from './TabBarRoute';
import auth, { onAuthStateChanged } from '@react-native-firebase/auth';
import Authorized from './Authorized';

const Stack = createNativeStackNavigator();

export const AuthenticatedUserContext = createContext({
  user: null,
  setUser: () => {},
});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const Routes = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth(), (authenticatedUser) => {
      setUser(authenticatedUser || null);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [setUser]);

  if (loading) {
    return null; 
  }

  return (
    <Stack.Navigator initialRouteName={user ? "Authorized" : "Auth"}>
      {user ? (
        <Stack.Screen
          name="Authorized"
          component={Authorized}
          options={{ headerShown: false }}
        />
        
      ) : (
        <Stack.Screen
          name="Auth"
          component={NoAuth}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Routes