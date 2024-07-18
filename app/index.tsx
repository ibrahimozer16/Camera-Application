import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Link, router } from 'expo-router'
import { PhotoProvider, usePhotos } from './context/photoContext';

export default function IndexScreen() {

  return (
    <PhotoProvider>
      <View style={styles.container}> 
        <PhotoList />
        <Link href={'/add'} style={styles.photo} onPress={()=> console.log("x")}> Camera </Link>
      </View>
    </PhotoProvider>
  )
}

const PhotoList = () => {
  const {photos, removePhoto, loadPhoto } = usePhotos();

  useEffect(() => {
    loadPhoto();
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
              <Pressable onPress={() => router.push(`/p/${photo.id}`)}>
                <Image source={{ uri: photo.uri }} style={styles.image} />
              </Pressable>
              <TouchableOpacity style={styles.button} onPress={() => handleDeletePhoto(photo.id)}>
                <Text style={styles.text}>Delete</Text>
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
    backgroundColor: '#dddddd', 
    bottom: 0,
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
    resizeMode: 'cover',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#993030',
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#dddddd'
  },
  photo: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#109999',
    padding: 24,
    borderRadius: 20,
    color: '#dddddd',
  }
})