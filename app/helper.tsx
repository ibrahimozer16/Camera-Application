import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function savePhotoUri(photoUri: string): Promise<void>{
    try {
        const existingUris = await AsyncStorage.getItem('photoUris');
        const uris = existingUris ? JSON.parse(existingUris) : [];
        uris.push(photoUri);
        await AsyncStorage.setItem('photoUris', JSON.stringify(uris)); 
    } catch (error) {
        console.log("Failed to save photo URIs: ", error);
    }
}

export async function loadPhotoUris(): Promise<string[]> {
    try {
        const uris = await AsyncStorage.getItem('photoUris');
        return uris ? JSON.parse(uris) : [];
    } catch (error) {
        console.error("Failed to load photo URIs:", error);
        return [];
    }
  }

export async function deletePhotoUri(photoUri : string): Promise<void> {
    try {
        const existingUris = await AsyncStorage.getItem('photoUris');
        let uris = existingUris ? JSON.parse(existingUris) : [];
        uris = uris.filter((uri: string) => uri !== photoUri)
        await AsyncStorage.setItem('photoUris', JSON.stringify(uris));
    } catch (error) {
        console.error("Failed to delete photo URI:", error);
    }
  }