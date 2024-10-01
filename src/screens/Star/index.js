import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, ImageBackground, Image } from 'react-native';
import { AuthenticatedUserContext } from '../../routes';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_URL } from '@env';
import LogoutButton from '../../components/LogoutButton';
import { COLOR } from '../../styles/common';
import Title from '../../components/Title';

const Star = () => {
    const { user } = useContext(AuthenticatedUserContext);
    const [likedUsers, setLikedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedUsers = async () => {
            if (user) {
                try {
                    const likedUsersRef = firebase
                        .app()
                        .database(DATABASE_URL)
                        .ref(`/users/${user.uid}/userInfor/people_liked`);

                    likedUsersRef.on('value', (snapshot) => {
                        const likedUids = snapshot.val() || [];
                        if (likedUids.length > 0) {
                            const usersPromises = likedUids.map(uid =>
                                firebase.app().database(DATABASE_URL).ref(`/users/${uid}/userInfor`).once('value')
                            );

                            Promise.all(usersPromises).then(usersSnapshots => {
                                const usersData = usersSnapshots.map(userSnapshot => userSnapshot.val());
                                setLikedUsers(usersData);
                                setLoading(false);
                            });
                        } else {
                            setLikedUsers([]);
                            setLoading(false);
                        }
                    });
                } catch (error) {
                    console.error('Error fetching liked users:', error);
                    Alert.alert('Error', 'Failed to fetch liked users.');
                    setLoading(false);
                }
            }
        };

        fetchLikedUsers();
        return () => {
            const likedUsersRef = firebase.app().database(DATABASE_URL).ref(`/users/${user.uid}/userInfor/people_liked`);
            likedUsersRef.off();
        };
    }, [user, likedUsers]);

    const renderUserItem = ({ item }) => {
        const imageSource = { uri: item.photos[0] } 

        return (
            <ImageBackground source={imageSource} style={styles.userItem} resizeMode="cover" imageStyle={styles.imageStyle}>
                <View style={styles.iconContainer}>
                    {item.isLiked && <Image source={require('../../assets/star.png')}   style={styles.icon} />}
                    {item.isStarred && <Image source={require('../../assets/like.png')}  style={styles.icon} />}
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userInfo}>{item.interests.join(', ')}</Text>
                </View>
            </ImageBackground>
        );
    };

    return (
        <View style={styles.container}>
          <Title content={'Top 10 người bạn đã like'} fontSize={20} />
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={likedUsers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderUserItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    ListEmptyComponent={<Text style={styles.emptyText}>Bạn chưa thích người nào!</Text>}
                />
            )}


<LogoutButton />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLOR.primaryColor, 
    },
    userItem: {
        flex: 1,
        height: 200,
        justifyContent: 'flex-end',
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden', 
    },
    imageStyle: {
        borderRadius: 10,
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 5,
        width: 24, 
        height: 24
    },
    infoContainer: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    userName: {
        fontSize: 18,
        color: COLOR.primaryColor,
        fontWeight: 'bold',
    },
    userInfo: {
        fontSize: 14,
        color: COLOR.primaryColor,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: COLOR.sunsetOrange, 
    },
});

export default Star;
