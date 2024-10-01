import { DATABASE_URL } from '@env';
import { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ButtonIcon from '../../../components/ButtonIcon';
import ButtonLinearColor from '../../../components/ButtonLinearColor';
import ProcessBar from '../../../components/ProcessBar';
import Title from '../../../components/Title';
import { COLOR } from '../../../styles/common';

const AddDOB = ({ route }) => {
  const navigation = useNavigation();
  const { userInfor } = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUpdateDOB = async () => {
    setLoading(true);
    
    const newUserInfor = {
      ...userInfor,
      dateOfBirth: date.toISOString().split('T')[0],
    };

    try {
      const reference = firebase.app().database(DATABASE_URL).ref(`/users/${userInfor?.uid}/userInfor`);
      await reference.update(newUserInfor);
      navigation.navigate('AddGender', { userInfor: newUserInfor });
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật ngày sinh của bạn!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ProcessBar percent={30} />
      <ButtonIcon source={require('../../../assets/arrow_left.png')} onPress={() => navigation.goBack()} />
      <View style={styles.contentContainer}>
        <Title content={'Hãy chọn ngày, tháng, năm sinh của bạn'} fontSize={30} />
        <View style={styles.datePickerContainer}>
          <DatePicker
            open={open}
            date={date}
            onConfirm={(selectedDate) => {
              setOpen(false);
              setDate(selectedDate);
              handleUpdateDOB();
            }}
            onCancel={() => setOpen(false)}
            mode="date"
            locale="vi"
            textColor="black"
            androidVariant="iosClone"
          />
        </View>
        <ButtonLinearColor content={'Tiếp tục'} onPress={handleUpdateDOB} loading={loading} />
      </View>
    </View>
  );
};

export default AddDOB;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primaryColor,
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
  datePickerContainer: {
    padding: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: COLOR.primaryColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
