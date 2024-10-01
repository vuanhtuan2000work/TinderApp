import { DATABASE_URL } from '@env';
import { firebase } from '@react-native-firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import ButtonIcon from '../../../components/ButtonIcon';
import ButtonLine from '../../../components/ButtonLine';
import ButtonLinearColor from '../../../components/ButtonLinearColor';
import ProcessBar from '../../../components/ProcessBar';
import Title from '../../../components/Title';
import { COLOR } from '../../../styles/common';
import { AuthenticatedUserContext } from '../../../routes';

const ChooseTargetGender = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfor } = route.params; 
  const { user } = useContext(AuthenticatedUserContext); 
  const [percent, setPercent] = useState(40); 
  const [gender, setGender] = useState('');

  const handleGenderSelection = async (selectedGender) => {
    try {
      await firebase.app().database(DATABASE_URL).ref(`/users/${user.uid}/userInfor`).update({
        ...userInfor,
        targetGender: selectedGender,
      });
      navigation.navigate('AddInterests', {
        userInfor: userInfor
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Có lỗi xảy ra khi cập nhật đối tượng giới tính.');
    }
  };

  const getBorderColor = (selectedGender) => {
    return gender === selectedGender ? COLOR.sunsetOrange : COLOR.lavenderGray;
  };

  const getContentColor = (selectedGender) => {
    return gender === selectedGender ? COLOR.sunsetOrange : COLOR.lavenderGray;
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.primaryColor }}>
      <ProcessBar percent={percent} />
      <ButtonIcon source={require('../../../assets/arrow_left.png')} onPress={() => navigation.goBack()} />
      <View style={{ width: '100%', paddingHorizontal: 30, alignItems: 'center' }}>
        <Title content={'Chọn đối tượng giới tính:'} fontSize={40} />
        <ButtonLine
          onPress={() => { setGender('man'); handleGenderSelection('man'); }}
          borderColor={getBorderColor('Nam')}
          contentColor={getContentColor('Nam')}
          content={'NAM'}
        />
        <ButtonLine
          onPress={() => { setGender('woman'); handleGenderSelection('woman'); }}
          borderColor={getBorderColor('Nữ')}
          contentColor={getContentColor('Nữ')}
          content={'NỮ'}
        />
        <ButtonLine
          onPress={() => { setGender('other'); handleGenderSelection('other'); }}
          borderColor={getBorderColor('Khác')}
          contentColor={getContentColor('Khác')}
          content={'KHÁC'}
        />
      </View>
      <View style={{ paddingHorizontal: 50 }}>
        <ButtonLinearColor 
          content={'Tiếp tục'} 
          onPress={() => handleGenderSelection(gender)} 
        />
      </View>
    </View>
  );
};

export default ChooseTargetGender;
