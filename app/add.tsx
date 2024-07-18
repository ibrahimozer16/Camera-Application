import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'expo-router'
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// import  fotoId from './p/[fotoId]';
import * as FileSystem from 'expo-file-system';
import { savePhotoUri, loadPhotoUris } from './helper';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AddScreen() {

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}: {type: any, data: any}) => {
    setScanned(true);
    // alert(`BarCode with type ${type} and data ${data} has been scanned!`);
    if(data.startsWith('http' || 'https')){
      Linking.canOpenURL(data).then((supported) => {
        if(supported){
          Linking.openURL(data);
        }else{
          console.log("Don't know how to open URI: " + data);
        }
      });
    }else{
      alert(`Scanned non-URL data: ${data}`);
    }
  }  

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
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button} onPress={backButton}>
              <Text style= {styles.text}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView 
          ref={cameraRef} 
          style={styles.camera} 
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button} onPress={takePicture}>
              <Text style= {styles.text}>Take Photo</Text>
            </TouchableOpacity>
            {
              scanned && (
                <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                  <Text style={styles.text}>Scan Again</Text>
                </TouchableOpacity>
              )
            }
            {/* <Link href={'/'} style={styles.button}>
              <Text style= {styles.text}>Go Back</Text>
            </Link> */}
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})