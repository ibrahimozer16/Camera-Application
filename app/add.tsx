import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'expo-router'
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import preview from './[preview]';
import * as FileSystem from 'expo-file-system';
import { savePhotoUri, loadPhotoUris } from './helper';

export default function add() {

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

async function takePicture() {
  try {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      if (data?.uri) {
        setPhotoUri(data.uri);
      } else {
        console.log("Geriye veri döndürülemedi");
      }
    } else {
      console.log("Camera reference is null");
    }
  } catch (error) {
    console.log(error, "ERROR <<<<<<<<<<<<<");
  }
}

async function savePhoto() {
  if(photoUri){
    await savePhotoUri(photoUri);
    alert('photo saved')
  }
}

function backButton(){
  setPhotoUri(null)
}

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{uri: photoUri}} style={styles.preview} resizeMode="cover"/>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={savePhoto}>
              <Text style={styles.text}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button2} onPress={backButton}>
              <Text style= {styles.text}>Geri Dön</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button2} onPress={takePicture}>
              <Text style= {styles.text}>Çek</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 30,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  button2: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})