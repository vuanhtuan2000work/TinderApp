import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet, ImageBackground, Text } from 'react-native';
import UserInfo from '../UserInfo';
import { COLOR } from '../../styles/common';

const UserImages = ({ images, user }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleTap = (direction) => {
        if (direction === 'left' && currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else if (direction === 'right' && currentIndex < images.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: images[currentIndex] }} style={styles.image}  imageStyle={{ borderRadius: 6}}>
            <View style={styles.infoContainer}>
                </View>
                <UserInfo user={user} />
            </ImageBackground>
            <Pressable style={styles.touchLeft} onPress={() => handleTap('left')} />
            <Pressable style={styles.touchRight} onPress={() => handleTap('right')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    touchLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '50%',
    },
    touchRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '50%',
    },
    infoContainer: {
        backgroundColor:'blue',
        position: 'absolute', 
        top: 0, 
        zIndex: 999
    },

});

export default UserImages;
