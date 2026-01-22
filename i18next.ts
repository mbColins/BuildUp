import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './src/locales/en.json';
import fr from './src/locales/fr.json';


const resources: Resource = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// persist language
i18n.on('languageChanged', async (lng: string) => {
  await AsyncStorage.setItem('lang', lng);
});

export default i18n;
