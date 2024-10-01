import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../../styles/common';

const UserInfo = ({ user }) => {
    const age = new Date().getFullYear() - new Date(user?.dateOfBirth).getFullYear();
    const genderLabel = user?.gender === 'man' ? 'Nam' : 'Nữ';
    const interests = user?.interests.slice(0, 3).join(', ');

    return (
        <View style={styles.userInfo}>
            <Text style={styles.text}>{user?.name}, {age}</Text>
            <Text style={styles.text}>Giới tính: {genderLabel}</Text>
            <Text style={styles.text}>Sở thích: {interests}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        maxWidth: '95%',
        position:'absolute', 
        bottom: 10,
        left: 30
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        color: COLOR.primaryColor,
    },
});

export default UserInfo;
