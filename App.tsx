/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import i18n from './i18next';
import { LanguageProvider } from './src/context/LanguageContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if(Platform.OS === 'android')
    SplashScreen.hide();
    // Any splash screen related code can go here if needed
  }, []);

  return (
    <LanguageProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </LanguageProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <NavigationContainer>
     <RootNavigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
