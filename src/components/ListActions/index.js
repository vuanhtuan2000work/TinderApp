import { Image, Pressable, StyleSheet, View, Alert } from 'react-native';
import React from 'react';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_URL } from '@env';
import { COLOR } from '../../styles/common';

export default function ListActions({ uid, currentUserUid, nextUser }) {
    const updatePeopleLiked = async (likedUserUid) => {
        try {
            const userRef = firebase.app().database(DATABASE_URL).ref(`/users/${currentUserUid}/userInfor/people_liked`);
            const snapshot = await userRef.once('value');
            const peopleLiked = snapshot.val() || [];
            if (!peopleLiked.includes(likedUserUid)) {
                await userRef.set([...peopleLiked, likedUserUid]);
            }
        } catch (error) {
            console.error('Error updating people_liked:', error);
        }
    };

    const updatePeopleStar = async (starUserUid) => {
        try {
            const userRef = firebase.app().database(DATABASE_URL).ref(`/users/${currentUserUid}/userInfor/people_star`);
            const snapshot = await userRef.once('value');
            const peopleStar = snapshot.val() || [];
            if (!peopleStar.includes(starUserUid)) {
                await userRef.set([...peopleStar, starUserUid]);
            }
        } catch (error) {
            console.error('Error updating people_star:', error);
        }
    };

    const handleLike = () => {
        updatePeopleLiked(uid);
        nextUser(); 
    };

    const handleUnlike = () => {
        nextUser(); 
    };

    const handleStar = () => {
        updatePeopleStar(uid);
        nextUser(); 
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={handleUnlike}>
                <Image source={require('../../assets/close_circle_line.png')} style={styles.icon} resizeMode='contain' tintColor={COLOR.sunsetOrange}/>
            </Pressable>
            <Pressable onPress={handleStar}>
                <Image source={require('../../assets/star_circle.png')} style={styles.icon} resizeMode='contain' />
            </Pressable>
            <Pressable onPress={handleLike}>
                <Image source={require('../../assets/like.png')} style={styles.icon} resizeMode='contain' />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    icon: { width: 50, height: 50 },
});
