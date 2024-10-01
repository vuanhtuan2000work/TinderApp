import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import ButtonLinearColor from '../../components/ButtonLinearColor';
import { useNavigation } from '@react-navigation/native';
import { DATABASE_URL } from '@env';
import { AuthenticatedUserContext } from '../../routes';
import { COLOR } from '../../styles/common';

const Login = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthenticatedUserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Email và mật khẩu không được để trống!');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const userId = userCredential.user.uid;
        try {
          const reference = firebase.app().database(DATABASE_URL).ref(`/users/${userId}/userInfor`);
          const userSnapshot = await reference.once('value');
          const userData = userSnapshot.val();
          if (userData) {
            setUser(userData);
            navigation.navigate('TabBarRoute');
          } else {
            Alert.alert('Không tìm thấy dữ liệu người dùng trong cơ sở dữ liệu.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Không thể lấy thông tin người dùng.');
        }
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('', 'Email hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('', 'Địa chỉ email không đúng định dạng! Vui lòng kiểm tra lại');
        } else {
          Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
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
      <ButtonLinearColor content={'Đăng nhập'} onPress={onHandleLogin} />
      <View style={styles.registerContainer}>
        <Text style={styles.text}>Bạn chưa có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Đăng ký</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

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
