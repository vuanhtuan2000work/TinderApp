import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../../routes';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_URL } from '@env';
import ImageCard from '../../components/ImageCard';
import { COLOR } from '../../styles/common';
import ListActions from '../../components/ListActions';

const HomeScreen = () => {
    const { user } = useContext(AuthenticatedUserContext);
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentUserIndex, setCurrentUserIndex] = useState(0); 

   
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            if (user) {
                try {
                    const allUsersRef = firebase.app().database(DATABASE_URL).ref('/users');
                    const allUsersSnapshot = await allUsersRef.once('value');
                    const allUsersData = allUsersSnapshot.val();
                    const filteredUsers = Object.keys(allUsersData)
                        .filter(uid => uid !== user.uid) 
                        .map(uid => ({
                            uid,
                            ...allUsersData[uid].userInfor, 
                        }));
    
                    setUsers(filteredUsers);
                } catch (error) {
                    console.error('Error fetching users:', error);
                    Alert.alert('Lỗi', 'Có lỗi xảy ra khi lấy danh sách người dùng.');
                } finally {
                    setLoading(false);
                }
            }
        };
    
        fetchUsers();
    }, [user, navigation]);
    

    const nextUser = () => {
        setCurrentUserIndex((prevIndex) => {
            if (prevIndex + 1 < users.length) {
                return prevIndex + 1;
            } else {
                return prevIndex;
            }
        });
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logoText.png')}
                resizeMode="contain"
                tintColor={COLOR.sunsetOrange}
            />
            {
                loading ? (
                    <ActivityIndicator size="large" color={COLOR.sunsetOrange} />
                ) : (
                    users.length > 0 ? (
                        <View style={styles.imageCardContainer}>
                            <ImageCard user={users[currentUserIndex]} users={users} currentUserUid={user.uid} nextUser={nextUser} />
                            <ListActions uid={users[currentUserIndex]?.uid} currentUserUid={user.uid} nextUser={nextUser} />
                        </View>
                    ) : (
                        <Text style={styles.noUsersText}>Không có người dùng nào để hiển thị.</Text>
                    )
                )
            }
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.primaryColor
    },
    logo: {
        width: 100,
        height: 25,
        marginLeft: 20,
        marginTop: 20,
    },
    imageCardContainer: {
        width: '100%',
        height: '92%',
        position: 'absolute',
        marginTop: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 2,
    },
    noUsersText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    }
});
