import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deletePhotoUri, loadPhotoUris } from '../helper';

export default function preview() {

  interface Photo {
    id: string;
    uri: string;
  }

  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const loadedPhotos = await loadPhotoUris();
      setPhotos(loadedPhotos);
    };
    fetchPhotos(); // Fonksiyonu useEffect hook içinde çağır
  }, []);

  const handleDeletePhoto = async (id: string) => {
    try {
        console.log("Deleting photo with ID:", id);
        await deletePhotoUri(id);
        const updatedPhotos = await loadPhotoUris();
        setPhotos(updatedPhotos);
        console.log("Photo deletion and reload successful.");
    } catch (error) {
        console.error("Error deleting photo:", error);
        alert("Photo could not be deleted. Error: "+error);
    }
  }

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
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
  text: {}
})