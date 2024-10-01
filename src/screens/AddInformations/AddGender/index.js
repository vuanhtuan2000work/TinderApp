import { DATABASE_URL } from '@env';
import { firebase } from '@react-native-firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import ButtonIcon from '../../../components/ButtonIcon';
import ButtonLine from '../../../components/ButtonLine';
import ButtonLinearColor from '../../../components/ButtonLinearColor';
import ProcessBar from '../../../components/ProcessBar';
import Title from '../../../components/Title';
import { COLOR } from '../../../styles/common';

const AddGender = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userInfor } = route.params; 
    console.log(userInfor)
    const [percent, setPercent] = useState(30);
    const [gender, setGender] = useState('');

    const getBorderColor = (selectedGender) => {
        return gender === selectedGender ? COLOR.sunsetOrange : COLOR.lavenderGray;
    };

    const getContentColor = (selectedGender) => {
        return gender === selectedGender ? COLOR.sunsetOrange : COLOR.lavenderGray;
    };

    const handleUpdateGender = async () => {
        if (!gender) {
            Alert.alert('Thông báo', 'Vui lòng chọn giới tính của bạn!');
            return;
        }

        const newUserInfor = {
            ...userInfor,
            gender: gender,
        };

        try {
            const reference = firebase.app().database(DATABASE_URL).ref(`/users/${userInfor?.uid}/userInfor`);
            await reference.update(newUserInfor); 
            // navigation.navigate('AddInterests', {userInfor: newUserInfor}); 
            navigation.navigate('ChooseTargetGender', {userInfor: newUserInfor}); 
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật giới tính của bạn!');
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: COLOR.primaryColor}}>
            <ProcessBar percent={percent} />
            <ButtonIcon source={require('../../../assets/arrow_left.png')} onPress={() => navigation.goBack()} />
            <View style={{ width: '100%', paddingHorizontal: 30, alignItems: 'center' }}>
                <Title content={'Giới tính của bạn là'} fontSize={40} />
                <ButtonLine
                    onPress={() => setGender('woman')}
                    borderColor={getBorderColor('woman')}
                    contentColor={getContentColor('woman')}
                    content={'NỮ'}
                />
                <ButtonLine
                    onPress={() => setGender('man')}
                    borderColor={getBorderColor('man')}
                    contentColor={getContentColor('man')}
                    content={'NAM'}
                />
            </View>
            <View style={{ paddingHorizontal: 50 }}>
                <ButtonLinearColor 
                    content={'Tiếp tục'} 
                    onPress={handleUpdateGender} 
                />
            </View>
        </View>
    );
};

export default AddGender;
