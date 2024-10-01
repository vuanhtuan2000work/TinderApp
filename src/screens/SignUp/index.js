import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useContext } from 'react';
import ButtonLinearColor from '../../components/ButtonLinearColor';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database'; 
import { AuthenticatedUserContext } from '../../routes';
import { DATABASE_URL } from '@env';
import { COLOR } from '../../styles/common'; 

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthenticatedUserContext);

  const onHandleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential?.user?.uid;
      if (userId) {
        setUser(userCredential.user);
        const userInfor = {
          dateOfBirth: null,
          email: userCredential.user.email,
          emailVerified: false,
          gender: null,
          interests: [],
          name: null,
          photos: [],
          uid: userId,
        };
        const reference = firebase.app().database(DATABASE_URL).ref(`/users/${userId}/userInfor`);
        await reference.set(userInfor);
      } else {
        throw new Error('Không thể lấy ID người dùng.');
      }
    } catch (error) {
      setLoading(false);
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('', 'Địa chỉ email này đã được sử dụng');
    } else if (error.code === 'auth/invalid-email') {
      Alert.alert('', 'Địa chỉ email này không hợp lệ');
    } else {
      Alert.alert('Lỗi', error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput
        placeholder='Nhập email'
        placeholderTextColor="#8a8a8a"
        style={styles.input}
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder='Nhập mật khẩu'
        placeholderTextColor="#8a8a8a"
        style={styles.input}
        autoCapitalize='none'
        secureTextEntry={true}
        autoCorrect={false}
        textContentType='password'
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <ButtonLinearColor content={'Đăng ký'} onPress={onHandleSignUp} loading={loading} />
      <View style={styles.registerContainer}>
        <Text style={styles.text}>Đã có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Đăng nhập</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLOR.primaryColor, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLOR.cerisePink, 
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLOR.primaryColor,  
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginVertical: 10,
    backgroundColor: COLOR.primaryColor, 
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    color: '#555',
    fontSize: 16,
  },
  link: {
    color: COLOR.sunsetOrange, 
    fontSize: 16,
    marginLeft: 5,
  },
});
