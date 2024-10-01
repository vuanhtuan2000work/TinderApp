import React, { useContext } from 'react';
import { View, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../../routes';


const LogoutButton = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthenticatedUserContext); 

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null); 
        navigation.navigate('Auth');
      })
      .catch((error) => {
        Alert.alert('Error', 'There was a problem logging out.');
        console.error('Logout error: ', error);
      });
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;