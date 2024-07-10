import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deletePhotoUri, loadPhotoUris } from './helper';

export default function preview() {

  const [photoUris, setPhotoUris] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const loadedUris = await loadPhotoUris();
      setPhotoUris(loadedUris);
    })();
  }, []);

  const handleDeletePhoto = async (uri: string) => {
    try {
        console.log("Deleting photo with URI:", uri);
        await deletePhotoUri(uri);
        const updatedUris = await loadPhotoUris();
        setPhotoUris(updatedUris);
        console.log("Photo deletion and reload successful.");
    } catch (error) {
        console.error("Error deleting photo:", error);
        alert("Photo could not be deleted. Error: "+error);
    }
}

  return (
    <View style={styles.container}>
      <ScrollView>
        {photoUris.length > 0 ? (
          photoUris.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: String(uri) }} style={styles.image} />
              <TouchableOpacity style={styles.button} onPress={() => handleDeletePhoto(uri)}>
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