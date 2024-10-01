import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLOR } from '../../styles/common';

const ImageList = ({ images, onAddImage, onRemoveImage }) => {
  const maxImages = 6;
  const imageSlots = Array.from({ length: maxImages });

  return (
    <View style={styles.container}>
      {imageSlots.map((_, index) => (
        <View key={index} style={styles.imageContainer}>
          {images[index] ? (
            <View>
              <Image source={{ uri: images[index] }} style={styles.image} />
              <TouchableOpacity style={styles.removeButton} onPress={() => onRemoveImage(index)}>
                <Image source={require('../../assets/close_circle.png')} style={styles.buttonAction} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={() => onAddImage(index)}>
              <Image source={require('../../assets/plus_circle.png')} style={styles.buttonAction} />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  
  },
  imageContainer: {
    width: '30%',
    aspectRatio: 2 / 3,
    marginBottom: 5,
    marginTop: 15,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: COLOR.primaryColor,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: COLOR.lavenderGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  addText: {
    fontSize: 24,
    color: 'white',
  },
  removeButton: {
    borderRadius: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonAction: {
    width: 50, height: 50, position: 'absolute',
    bottom: -15,
    right: -15,
  }
});

export default ImageList;
