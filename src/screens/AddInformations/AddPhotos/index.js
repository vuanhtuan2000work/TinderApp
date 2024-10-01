import { DATABASE_URL } from '@env';
import { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonIcon from '../../../components/ButtonIcon';
import ButtonLinearColor from '../../../components/ButtonLinearColor';
import ImageList from '../../../components/ImageList';
import ModalCameraAndPickPhoto from '../../../components/ModalCameraAndPickPhoto';
import ProcessBar from '../../../components/ProcessBar';
import TextContent from '../../../components/TextContent';
import Title from '../../../components/Title';
import { COLOR } from '../../../styles/common';
import storage, { utils } from '@react-native-firebase/storage';

const AddPhotos = () => {
    const [percent, setPercent] = useState(85);
    const navigation = useNavigation();
    const route = useRoute();
    const { userInfor } = route.params;
    const [images, setImages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleAddImage = () => {
        handleOpenModal();
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleResponse = async (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image picker error: ', response.error);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            if (imageUri) {
                setImages((prevImages) => [...prevImages, imageUri]); 
                handleCloseModal();
            }
        }
    };

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, handleResponse);
    };

    const uploadImagesToFirebase = async (images) => {
        const uploadPromises = images.map(async (imageUri) => {
            const fileName = imageUri.split('/').pop();
            const reference = storage().ref(`images/${fileName}`); 
            await reference.putFile(imageUri); 
            const downloadURL = await reference.getDownloadURL(); 
            return downloadURL; 
        });

        return Promise.all(uploadPromises); 
    };

    const listFilesAndDirectories = async () => {
        const reference = storage().ref('images');
        try {
            const result = await reference.list();
            result.items.forEach(ref => {
                console.log(ref.fullPath);
            });
        } catch (error) {
            console.error('Error listing files:', error);
        }
    };

    const handleSubmit = async () => {
        setLoading(true)
        if (images.length < 2 || images.length > 6) {
            setLoading(false)
            Alert.alert('Thông báo', 'Bạn cần thêm từ 2 đến 6 ảnh để tiếp tục!');
            return;
        }

        try {
            const imageUrls = await uploadImagesToFirebase(images);
            const newUserInfor = {
                ...userInfor,
                photos: [],
            };
            imageUrls.forEach(url => {
                newUserInfor.photos.push(url);
            });
            const reference = firebase.app().database(DATABASE_URL).ref(`/users/${userInfor?.uid}/userInfor`);
            await reference.update(newUserInfor);
            await AsyncStorage.setItem(`userPhotos_${userInfor.uid}`, JSON.stringify(imageUrls));
            setLoading(false)
            navigation.navigate('WelcomeScreen'); 
            await listFilesAndDirectories();
        } catch (error) {
            setLoading(false)
            console.error(error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật ảnh của bạn!');
        }
        
    };

    return (
        <View style={{flex: 1,backgroundColor: COLOR.primaryColor}}>
            <ProcessBar percent={percent} />
            <ButtonIcon source={require('../../../assets/arrow_left.png')} onPress={() => navigation.goBack()} />
            <View style={{ paddingHorizontal: 30, }}>
                <Title content={'Thêm Ảnh'} fontSize={40} />
                <TextContent content={'Thêm ít nhất 2 ảnh để tiếp tục'} color={COLOR.romanSilver} />
                <ImageList images={images} onAddImage={handleAddImage} onRemoveImage={handleRemoveImage} />
            </View>
            <View style={{ paddingHorizontal: 50, backgroundColor: COLOR.primaryColor }}>
                <ButtonLinearColor 
                    content={`Tiếp tục ${images.length}/6`} 
                    onPress={handleSubmit} 
                    loading={loading}
                />
            </View>
            <ModalCameraAndPickPhoto 
                visible={modalVisible} 
                onClose={handleCloseModal} 
                openImagePicker={openImagePicker} 
            />
        </View>
    );
};

export default AddPhotos;
