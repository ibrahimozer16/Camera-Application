import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { deletePhotoUri, loadFolder, loadPhotoUris } from './helper'
import * as FileSystem from 'expo-file-system';
import { PhotoProvider, usePhotos } from './context/photoContext';

export default function index() {

  return (
    <PhotoProvider>
      <View style={styles.container}> 
        <Link href={'/add'} style={styles.photo} onPress={()=> console.log("x")}> Camera </Link>
        <PhotoList />
      </View>
    </PhotoProvider>
  )
}

const PhotoList = () => {
  const {photos, removePhoto, loadPhoto } = usePhotos();

  useEffect(() => {
    const fetchPhotos = async () => {
      loadPhoto();
    };
    fetchPhotos(); // Fonksiyonu useEffect hook içinde çağır
  }, []);

  const handleDeletePhoto = async (photoId: string) => {
    try {
      await removePhoto(photoId);
      alert('Photo removed successfully!');
    } catch (error) {
      alert('Failed to remove photo');
    }
  }

  return (
    <View style={styles.container1}>
      <ScrollView>
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <View key={photo.id} style={styles.imageContainer}>
              <Image source={{ uri: photo.uri }} style={styles.image} />
              <TouchableOpacity style={styles.button} onPress={() => handleDeletePhoto(photo.id)}>
                <Text style={styles.text}>Sil</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No photos available</Text>
        )}
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  text: {},
  photo: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'red',
    padding: 24,
  }
})