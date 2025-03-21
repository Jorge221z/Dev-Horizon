import EStyleSheet from 'react-native-extended-stylesheet';
import { NativeBaseProvider } from 'native-base';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { useFonts, Lato_100Thin, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import { ActivityLoader } from './src/components/Shared';
import AppNavigation from './src/navigations/AppNavigation';
require("./src/theme");
import { RootSiblingParent } from 'react-native-root-siblings';
import { AuthProvider } from './src/providers/AuthProvider';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Warning: TextElement: Support for defaultProps will be removed from function components',
]);

export default function App({ appName = Constants.expoConfig.name }) {
  const [fontsLoaded] = useFonts({
    Lato_100Thin, Lato_400Regular, Lato_700Bold,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await cacheResourcesAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
    <RootSiblingParent>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AuthProvider>
          <AppNavigation />
        </AuthProvider>
      </View>
    </RootSiblingParent>
  </NativeBaseProvider>
  );
}

// Función para precargar recursos (imágenes)
const cacheResourcesAsync = async () => {
  const images = [
    require('./assets/app_icon.png'),
  ];
  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  });
  return Promise.all(cacheImages);
};

// Estilos con EStyleSheet
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$white',
  },
  text: {
    fontSize: '$font28',
    color: '$white',
    fontFamily: '$400Regular',
  },
});