import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR } from '../../styles/common';



export const ModalCameraAndPickPhoto = ({ visible, onClose , openImagePicker}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openImagePicker} style={styles.cameraButton}>
            <Image source={require('../../assets/gallery.png')} style={styles.icon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Thư viện ảnh</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(1,1,1,0.5)', 
  },
  modalContent: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
    paddingLeft: 15,
    backgroundColor: COLOR.primaryColor,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontWeight: '600',
    fontSize: 18,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  icon: {
    width: 54,
    height: 54,
  },
  buttonTextContainer: {
    justifyContent: 'center',
    width: '90%',
    paddingLeft: 30,
    borderBottomWidth: 1,
    height: 54,
    marginLeft: 15,
    borderBottomColor: COLOR.primaryColor,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.romanSilver,
  },
});

export default ModalCameraAndPickPhoto;
