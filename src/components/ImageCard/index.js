import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_URL } from '@env';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import UserImages from '../UserImage';

const ImageCard = ({ user, users, currentUserUid, nextUser }) => {
    // const translateX = useSharedValue(0);  
    // const animatedStyle = useAnimatedStyle(() => {
    //     const rotateZ = interpolate(translateX.value, [-200, 0, 200], [-10, 0, 10]);  
    //     return {
    //         transform: [{ translateX: translateX.value }, { rotateZ: `${rotateZ}deg` }],
    //     };
    // });

    // const swipeGesture = Gesture.Pan()
    //     .onUpdate((event) => {
    //         translateX.value = event.translationX; 
    //     })
    //     .onEnd((event) => {
    //         const { translationX } = event;
    //         if (translationX < -50) {
    //             runOnJS(handleSwipe)('left'); 
    //         } else if (translationX > 50) {
    //             runOnJS(handleSwipe)('right'); 
    //         } else {
    //             translateX.value = withTiming(0);  
    //         }
    //     });

    // const handleSwipe = async (direction) => {
    //     const isLiked = direction === 'right';
    //     const userToLikeUid = user.uid; 
    //     const currentUserRef = firebase.app().database(DATABASE_URL).ref(`/users/${currentUserUid}/userInfor`);

    //     if (isLiked) {
    //         try {
    //             await currentUserRef.child('people_liked').once('value', async (snapshot) => {
    //                 const peopleLiked = snapshot.val() || [];
    //                 if (!peopleLiked.includes(userToLikeUid)) {
    //                     peopleLiked.push(userToLikeUid);
    //                     await currentUserRef.child('people_liked').set(peopleLiked);
    //                 }
    //             });
    //         } catch (error) {
    //             console.error('Error updating liked user:', error);
    //         }
    //     }
    //     runOnJS(nextUser)(); 
    //     translateX.value = withTiming(0);
    // };

    return (
        <View style={styles.gestureContainer}>
            <View style={styles.card}>
                <UserImages images={user?.photos} user={user} />
            </View>
        </View>
        // <GestureHandlerRootView style={styles.gestureContainer}>
        //     <GestureDetector gesture={swipeGesture}>
        //         <Animated.View style={[styles.card, animatedStyle]}>
        //             <UserImages images={user?.photos} user={user} translateX={translateX} />
        //         </Animated.View>
        //     </GestureDetector>
        // </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
    },
    card: {
        width: '100%',
        height: '100%',
        padding: 5,
        borderRadius: 10,
    },
});

export default ImageCard;
