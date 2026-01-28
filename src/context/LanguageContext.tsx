import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18next';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    return typeof i18n.language === 'string' ? i18n.language : 'en';
  });

  // Initialize language from AsyncStorage on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('lang');
        if (savedLang && typeof i18n.changeLanguage === 'function') {
          await i18n.changeLanguage(savedLang);
          setLanguage(savedLang);
        }
      } catch (error) {
        console.error('Error retrieving language from storage:', error);
      }
    };

    initializeLanguage();
  }, []);

  const changeLanguage = async (lang: string) => {
    try {
      if (typeof i18n.changeLanguage !== 'function') {
        throw new Error('i18n.changeLanguage is not available');
      }
      const result = await i18n.changeLanguage(lang);
      await AsyncStorage.setItem('lang', lang);
      setLanguage(lang);
      return result;
    } catch (error) {
      console.error('Error changing language:', error);
      throw error;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
