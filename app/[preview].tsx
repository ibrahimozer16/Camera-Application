import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { loadPhotoUris } from './helper';

export default function preview() {

  const [photoUris, setPhotoUris] = useState<String[]>([]);

  useEffect(() => {
    (async () => {
      const loadedUris = await loadPhotoUris();
      setPhotoUris(loadedUris);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {photoUris.length > 0 ? (
          photoUris.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: String(uri) }} style={styles.image} />
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
  }
})