import { useNavigation } from '@react-navigation/native';
import ButtonIcon from '../../components/ButtonIcon';
import ButtonLinearColor from '../../components/ButtonLinearColor';
import ProcessBar from '../../components/ProcessBar';
import TextContent from '../../components/TextContent';
import Title from '../../components/Title';
import React, { useState, useContext } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { DATABASE_URL } from '@env';
import { AuthenticatedUserContext } from '../../routes';
import { COLOR } from '../../styles/common'; 

const AddName = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthenticatedUserContext);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const namePattern = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẰẮẲẴẶÂẦẤẨẪẬÊỀẾỂỄỆÔỒỐỔỖỘơưăặắẳẵâầấẩẫậêềếểễệôồốổỗộ\s]+$/;
    if (!name) {
      setLoading(false);
      Alert.alert('Thông báo', 'Vui lòng nhập tên của bạn!');
      return;
    } else if (!namePattern.test(name)) {
      setLoading(false);
      Alert.alert('Thông báo', 'Tên không được chứa số hoặc ký tự đặc biệt!');
      return;
    }

    const userInfor = {
      email: user?.email,
      emailVerified: user?.emailVerified,
      phoneNumber: user?.phoneNumber,
      photoURL: user?.photoURL,
      userInformationsDetails: user?.userInformations,
      uid: user?.uid,
      name: name,
    };

    try {
      const reference = firebase.app().database(DATABASE_URL).ref(`/users/${user.uid}/userInfor`);
      await reference.update(userInfor);
      setLoading(false);
      navigation.navigate('AddDOB', { userInfor: userInfor });
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu tên của bạn!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    let currentUser = auth().currentUser;
    if (currentUser) {
      try {
        await currentUser.delete();
        Alert.alert('Bạn chưa hoàn tất việc tạo tài khoản!', 'Hãy tạo tài khoản để có trải nghiệm tốt nhất!');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa tài khoản của bạn!');
      }
    } else {
      Alert.alert('Lỗi', 'Không tìm thấy người dùng để xóa!');
    }
  };

  return (
    <View style={styles.container}>
      <ProcessBar percent={10} />
      <ButtonIcon onPress={handleDeleteAccount} style={styles.iconButton} />
      <View style={styles.formContainer}>
        <Title content={'Nhập tên của bạn'} fontSize={32} style={styles.title} />
        <TextInput
          style={styles.input}
          placeholder="Tên của bạn là..."
          value={name}
          onChangeText={setName}
          placeholderTextColor={COLOR.textPlaceholder}
        />
        <TextContent
          content={'Tên của bạn sẽ xuất hiện trong Tinder và bạn sẽ có thể thay đổi trong phần cài đặt.'}
          style={styles.textContent}
        />
        <ButtonLinearColor content={'Tiếp tục'} onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

export default AddName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLOR.primaryColor, 
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: COLOR.cerisePink,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLOR.sunsetOrange,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: COLOR.inputBackground, 
    fontSize: 16,
    shadowColor: COLOR.sunsetOrange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 30
  },
  textContent: {
    marginBottom: 20,
    textAlign: 'center',
    color: COLOR.textSecondary,
  },
  iconButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
