import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { loadPhotoUris } from './helper';

import IndexScreen from './index';
import AddScreen from './add';
import DetailScreen from './p/[fotoId]';
import NotFoundScreen from './+not-found';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <ThemeProvider value={ DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="add" />
        <Stack.Screen name="p/[fotoId]" options={{title: "photo"}} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}