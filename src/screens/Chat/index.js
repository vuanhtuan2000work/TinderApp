import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player'; 
import { firebase } from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'; 
import { DATABASE_URL } from '@env';
import { AuthenticatedUserContext } from '../../routes';
import { COLOR } from '../../styles/common';

const ChatScreen = ({ route, navigation }) => {
  const { chatRoomId } = route.params;
  const { user } = useContext(AuthenticatedUserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    const messagesRef = firebase.app().database(DATABASE_URL).ref(`/chatRooms/${chatRoomId}/messages`);

    const onValueChange = messagesRef.on('value', snapshot => {
      const messageData = snapshot.val() || {};
      const messageList = Object.keys(messageData).map(key => ({
        ...messageData[key],
        id: key,
      }));
      setMessages(messageList);
    });
    return () => messagesRef.off('value', onValueChange);
  }, [chatRoomId]);

  const handleSendMessage = async (type = 'text', content = newMessage) => {
    if (content.trim() === '') return;

    setIsLoading(true); 

    try {
      const messageRef = firebase.app().database(DATABASE_URL).ref(`/chatRooms/${chatRoomId}/messages`).push();
      await messageRef.set({
        type,
        content,
        senderId: user.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const reference = storage().ref(`images/${imageName}`);

      setIsLoading(true); 

      try {
        await reference.putFile(imageUri);
        const downloadUrl = await reference.getDownloadURL();
        await handleSendMessage('image', downloadUrl); 
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsLoading(false); 
      }
    }
  };

  const handleRecordVoice = async () => {
    if (isRecording) {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);

      const reference = storage().ref(`audio/${new Date().getTime()}.mp3`);
      setIsLoading(true); 

      try {
        await reference.putFile(result);
        const downloadUrl = await reference.getDownloadURL();
        await handleSendMessage('audio', downloadUrl); 
      } catch (error) {
        console.error('Error uploading audio:', error);
      } finally {
        setIsLoading(false); 
      }
    } else {
      setIsRecording(true);
      await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(() => {});
    }
  };

  const renderMessageItem = ({ item }) => {
    if (item.type === 'text') {
      return (
        <View
          style={[
            styles.message,
            item.senderId === user.uid ? styles.myMessage : styles.partnerMessage,
          ]}
        >
          <Text style={styles.messageText}>{item.content}</Text>
        </View>
      );
    } else if (item.type === 'image') {
      return (
        <View
          style={[
            styles.message,
            item.senderId === user.uid ? styles.myMessage : styles.partnerMessage,
          ]}
        >
          <Image source={{ uri: item.content }} style={styles.imageMessage} />
        </View>
      );
    } else if (item.type === 'audio') {
      return (
        <View
          style={[
            styles.message,
            item.senderId === user.uid ? styles.myMessage : styles.partnerMessage,
          ]}
        >
          <Text style={styles.messageText}>Voice Message: {item.content}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={{ width: '100%', height: 50 }} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/arrow_left.png')} resizeMode='contain' style={{ width: 20, height: 20, marginTop: 15, marginLeft: 10 }} />
      </Pressable>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        inverted
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handlePickImage} style={styles.imageButton}>
          <Text>🖼️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRecordVoice} style={styles.audioButton}>
          <Text>{isRecording ? '🎙️' : '🎤'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage()}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>Gửi</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primaryColor,
  },
  message: {
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '75%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLOR.sunsetOrange,
    borderBottomRightRadius: 0,
  },
  partnerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e4e6eb',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  imageMessage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f1f1f1',
  },
  sendButton: {
    backgroundColor: COLOR.cerisePink,
    borderRadius: 25,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageButton: {
    marginRight: 10,
  },
  audioButton: {
    marginRight: 10,
  },
});

export default ChatScreen;
