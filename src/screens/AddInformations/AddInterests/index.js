import { DATABASE_URL } from '@env';
import { firebase } from '@react-native-firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View, Alert } from 'react-native';
import ButtonIcon from '../../../components/ButtonIcon';
import ButtonLinearColor from '../../../components/ButtonLinearColor';
import ProcessBar from '../../../components/ProcessBar';
import TextContent from '../../../components/TextContent';
import Title from '../../../components/Title';
import { hobbies } from '../../../dataHobbies/hobbies';
import { COLOR } from '../../../styles/common';
import { addInterestsStyles } from './styles';

const AddInterests = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userInfor } = route.params; 
    const [percent, setPercent] = useState(70);
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const toggleHobby = (hobby) => {
        if (selectedHobbies.includes(hobby)) {
            setSelectedHobbies(selectedHobbies.filter(item => item !== hobby));
        } else {
            setSelectedHobbies([...selectedHobbies, hobby]);
        }
    };

    const handleUpdateInterests = async () => {
        if (selectedHobbies.length === 0) {
            Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một sở thích!');
            return;
        }

        const newUserInfor = {
            ...userInfor,
            interests: selectedHobbies, 
        };

        try {
            const reference = firebase.app().database(DATABASE_URL).ref(`/users/${userInfor?.uid}/userInfor`);
            await reference.update(newUserInfor); 
            navigation.navigate('AddPhotos', {userInfor: newUserInfor}); 
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật sở thích của bạn!');
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: COLOR.primaryColor, }}>
            <ProcessBar percent={percent} />
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 35 }}>
                <ButtonIcon source={require('../../../assets/arrow_left.png')} onPress={() => navigation.goBack()} />
            </View>
            <View style={{ paddingHorizontal: 30 }}>
                <Title content={'Sở thích'} fontSize={40} />
                <TextContent content={'Hãy để mọi người biết về sở thích của bạn'} color={COLOR.lavenderGray} />
            </View>
            <View style={addInterestsStyles.listItem}>
                <ScrollView contentContainerStyle={addInterestsStyles.flexContainer} showsVerticalScrollIndicator={false}>
                    {hobbies.map((hobby, index) => {
                        const isSelected = selectedHobbies.includes(hobby);
                        return (
                            <Pressable
                                key={index}
                                onPress={() => toggleHobby(hobby)}
                                style={[
                                    addInterestsStyles.hobbyItem,
                                    { borderColor: isSelected ? COLOR.cerisePink : COLOR.lavenderGray },
                                ]}
                                disabled={selectedHobbies.length >= 10 && !isSelected} 
                            >
                                <Text style={[addInterestsStyles.hobbyText, {
                                    color: isSelected ? COLOR.cerisePink : COLOR.lavenderGray
                                }]}>{hobby}</Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={{ paddingHorizontal: 30, backgroundColor: 'transparents' }}>
                <ButtonLinearColor 
                    content={`Tiếp tục ${selectedHobbies.length}/10`} 
                    onPress={handleUpdateInterests} 
                />
            </View>
        </View>
    );
}

export default AddInterests;
