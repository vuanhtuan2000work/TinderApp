import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_URL } from '@env';
import { AuthenticatedUserContext } from '../../../routes';
import { COLOR } from '../../../styles/common';
import TextContent from '../../../components/TextContent';

const WaitingRoomScreen = ({ navigation }) => {
    const { user } = useContext(AuthenticatedUserContext);
    const [topUsers, setTopUsers] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTopUsers = async () => {
            if (user) {
                try {
                    const likedUsersRef = firebase.app().database(DATABASE_URL).ref(`/users/${user.uid}/userInfor/people_liked`);
                    const starredUsersRef = firebase.app().database(DATABASE_URL).ref(`/users/${user.uid}/userInfor/people_star`);
                    const likedUsersSnapshot = await likedUsersRef.once('value');
                    const starredUsersSnapshot = await starredUsersRef.once('value');
                    const likedUids = likedUsersSnapshot.val() || [];
                    const starredUids = starredUsersSnapshot.val() || [];
                    const allUsersRef = firebase.app().database(DATABASE_URL).ref('/users');
                    const allUsersSnapshot = await allUsersRef.once('value');
                    const allUsersData = allUsersSnapshot.val();
                    const usersWithScore = Object.keys(allUsersData)
                        .filter(uid => uid !== user.uid && (likedUids.includes(uid) || starredUids.includes(uid)))
                        .map(uid => {
                            const userData = allUsersData[uid].userInfor;
                            const score = (starredUids.includes(uid) ? 2 : 0) + (likedUids.includes(uid) ? 1 : 0);
                            return { uid, ...userData, score };
                        })
                        .filter(user => user.score > 0)
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3);
                    const topUserPromises = usersWithScore.map(async (user) => {
                        const userDetailSnapshot = await firebase.app().database(DATABASE_URL).ref(`/users/${user.uid}/userInfor`).once('value');
                        return { ...user, ...userDetailSnapshot.val() };
                    });
                    const topUsersDetails = await Promise.all(topUserPromises);
                    setTopUsers(topUsersDetails);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching top users:', error);
                    Alert.alert('Error', 'Failed to fetch top users.');
                    setLoading(false);
                }
            }
        };
        const fetchChatList = async () => {
            if (user) {
                try {
                    const chatRef = firebase.app().database(DATABASE_URL).ref(`/chatRooms`);
                    const chatSnapshot = await chatRef.once('value');
                    const chatData = chatSnapshot.val() || {};
                    const chatsArray = [];

                    Object.keys(chatData).forEach((chatRoomId) => {
                        const chatRoom = chatData[chatRoomId];
                        if (chatRoom.users[user.uid]) {
                            const messages = chatRoom.messages || {};
                            const lastMessage = Object.values(messages).pop();
                            const lastMessageSender = lastMessage ? lastMessage.senderUid : null;
                            const lastMessageText = lastMessage ? lastMessage.text : 'Chưa có tin nhắn mới';

                            chatsArray.push({
                                chatRoomId,
                                partnerUid: chatRoomId.replace(`${user.uid}_`, ''),
                                ...chatRoom,
                                lastMessage: lastMessageText,
                                lastMessageSender: lastMessageSender,
                            });
                        }
                    });
                    const userNamePromises = chatsArray.map(async (chat) => {
                        const partnerUid = chat.partnerUid;
                        const partnerSnapshot = await firebase.app().database(DATABASE_URL).ref(`/users/${partnerUid}/userInfor`).once('value');
                        const partnerData = partnerSnapshot.val();

                        const partnerName = partnerData ? partnerData.name : 'Unknown User';

                        return {
                            ...chat,
                            partnerName,
                        };
                    });
                    const chatListWithNames = await Promise.all(userNamePromises);
                    setChatList(chatListWithNames);
                } catch (error) {
                    console.error('Error fetching chat list:', error);
                }
            }
        };
        fetchTopUsers();
        fetchChatList();
    }, [user, topUsers]);
    const createChatRoom = async (partnerUid) => {
        const chatRoomId = `${user.uid}_${partnerUid}`;
        const chatRoomRef = firebase.app().database(DATABASE_URL).ref(`/chatRooms/${chatRoomId}`);
        const chatRoomSnapshot = await chatRoomRef.once('value');
        if (chatRoomSnapshot.exists()) {
            navigation.navigate('ChatScreen', { chatRoomId });
            return;
        }
        const partnerSnapshot = await firebase.app().database(DATABASE_URL).ref(`/users/${partnerUid}/userInfor`).once('value');
        const partnerData = partnerSnapshot.val();

        await chatRoomRef.set({
            users: {
                [user.uid]: true,
                [partnerUid]: true,
            },
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            partnerAvatar: partnerData.photos && partnerData.photos.length > 0 ? partnerData.photos[0] : null,
            partnerName: partnerData.name,
        });

        navigation.navigate('ChatScreen', { chatRoomId });
    };

    const renderUserItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.userItem} onPress={() => createChatRoom(item.uid)}>
                <View style={styles.imageContainer}>
                    {item.photos && item.photos.length > 0 ? (
                        <Image source={{ uri: item.photos[0] }} style={styles.userImage} />
                    ) : (
                        <View style={styles.placeholderImage} />
                    )}
                    <View style={styles.statusIndicator} />
                </View>
                <Text style={styles.userName}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${hours}:${minutes} - ${day}/${month}/${year}`;
    };

    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatScreen', { chatRoomId: item.chatRoomId })}>
            <View style={styles.chatItemContainer}>
                {item.partnerAvatar ? (
                    <Image source={{ uri: item.partnerAvatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.placeholderAvatar} />
                )}
                <View style={styles.chatInfo}>
                    <Text style={styles.chatName}>{item.partnerName}</Text>
                    <Text style={styles.chatMessage}>
                        {item.lastMessage || 'Chưa có tin nhắn mới'}
                        {'\n'}
                        {formatTimestamp(item.createdAt)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={COLOR.primaryColor} />
            ) : (
                <View>
                    <Text style={styles.sectionTitle}>Người tương hợp</Text>
                    {topUsers?.length <1 && <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.placeholderImage}>
                            <TextContent content={'1'} color={COLOR.primaryColor} fontSize={20} />
                        </View>
                        <View style={[styles.placeholderImage, { backgroundColor: COLOR.cerisePink }]}>
                            <TextContent content={2} color={COLOR.primaryColor} fontSize={20} />
                        </View>
                        <View style={[styles.placeholderImage, { backgroundColor: COLOR.lavenderGray }]}>
                            <TextContent content={3} color={COLOR.primaryColor} fontSize={20} />
                        </View>
                    </View>}
                    <FlatList
                        data={topUsers}
                        keyExtractor={(item) => item.uid}
                        renderItem={renderUserItem}
                        numColumns={3}
                        columnWrapperStyle={styles.row}
                    />
                    <Text style={styles.sectionTitle}>Tin nhắn</Text>
                    <FlatList
                        data={chatList}
                        keyExtractor={(item) => item.partnerUid}
                        renderItem={renderChatItem}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLOR.primaryColor,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLOR.darkGray,
        marginBottom: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    userItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,

    },
    imageContainer: {
        position: 'relative',
        width: 100,
        height: 130,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: COLOR.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    placeholderImage: {
        width: 100,
        height: 130,
        backgroundColor: COLOR.sunsetOrange,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 15
    },
    statusIndicator: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: COLOR.sunsetOrange,
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        color: COLOR.darkGray,
    },
    chatItem: {
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        marginHorizontal: 2
    },
    chatItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    placeholderAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        marginRight: 15,
    },
    chatInfo: {
        flex: 1,
    },
    chatName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLOR.darkGray,
    },
    chatMessage: {
        fontSize: 14,
        color: '#777',
    },
});

export default WaitingRoomScreen;
