import React, { createContext, useContext, useState } from 'react';
import { deletePhotoUri, loadPhotoUris, savePhotoUri } from '../helper';

interface Photo {
    id: string;
    uri: string;
};

interface PhotoContextType {
    photos: Photo[];
    addPhoto: (photoUri: string) => Promise<void>
    removePhoto: (photoUri: string) => Promise<void>
    loadPhoto: () => Promise<void>
}

const PhotoContext = createContext<PhotoContextType>({
    photos: [],
    addPhoto: async (photoUri: string) => {},
    removePhoto: async (photoUri: string) => {},
    loadPhoto: async () => {}
});

const PhotoProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [photos, setPhotos] = useState<Photo[]>([]);

    const addPhoto = async (photoUri: string) => {
        await savePhotoUri(photoUri);
        loadPhoto();
    };

    const removePhoto = async (photoId: string) => {
        await deletePhotoUri(photoId);
        loadPhoto();
    };

    const loadPhoto = async () => {
        await loadPhotoUris();
        const loadPhotos = await loadPhotoUris();
        setPhotos(loadPhotos);
    }
    return (
        <PhotoContext.Provider value={{photos, addPhoto, removePhoto, loadPhoto}}>
            {children}
        </PhotoContext.Provider>
    )
};

const usePhotos = () => {
    const context = useContext(PhotoContext);
    if(!context){
        throw new Error('usePhotos must be used within a PhotoProvider')
    }
    return context;
};

export {PhotoContext, PhotoProvider, usePhotos};