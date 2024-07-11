import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { uuid } from './uuid';


interface Photo {
    id: string;
    uri: string;
}

export async function savePhotoUri(photoUri: string): Promise<void>{
    const id = uuid();
    const filename = photoUri.split('/').pop();
    const documentDirectory = FileSystem.documentDirectory;
    if(documentDirectory === null){
        throw new Error("documentDirectory bulunamadı!");
    }
    const newPath = documentDirectory + filename;

    try {
        await FileSystem.moveAsync({
            from: photoUri,
            to: newPath,
        });
        const existingUris = await AsyncStorage.getItem('photoUris');
        const photos = existingUris ? JSON.parse(existingUris) : [];
        photos.push({id, uri: newPath});
        await AsyncStorage.setItem('photoUris', JSON.stringify(photos)); 
        console.log("Photo saved with ID: ", id)
        console.log("File saved to: ", newPath);
    } catch (error) {
        console.log("Error saving photo: ", error);
    }
}

export async function loadPhotoUris(): Promise<any[]> {
    try {
        const entries = await AsyncStorage.getItem('photoUris');
        console.log(entries);
        return entries ? JSON.parse(entries) : [];
       
    } catch (error) {
        console.error("Failed to load photo URIs:", error);
        return [];
    }
  }

export async function deletePhotoUri(id : string): Promise<void> {
    try {
        const entries = await AsyncStorage.getItem('photoUris');
        const photos: Photo[] = entries ? JSON.parse(entries) : [];
        const filteredPhotos = photos.filter((photo: Photo) => photo.id !== id)
        await AsyncStorage.setItem('photoUris', JSON.stringify(filteredPhotos));
    } catch (error) {
        console.error("Failed to delete photo:", error);
    }
  }

export async function loadFolder(uri: string){
    try {
        const dir = await FileSystem.readDirectoryAsync(uri)
        console.log(dir)
    } catch (error) {
        
    }
}