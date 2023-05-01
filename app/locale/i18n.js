import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ru from './ru.json';
import es from './es.json';
import {NativeModules, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let deviceLanguage = (Platform.OS === 'ios'
? NativeModules.SettingsManager.settings.AppleLocale ||
  NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
: NativeModules.I18nManager.localeIdentifier).toLowerCase().substr(0, 2);

async function saveLocale(locale) {
  let validatedLocale = '';
 
  if (locale === 'ru' || locale === 'es' || locale === 'en') {
    validatedLocale = locale;
  } else {
    validatedLocale = 'en';
  }
  
  try {
    await AsyncStorage.setItem('language', validatedLocale);
  } catch (error) {
    console.log('Error saving locale: ', error);
  }
  return validatedLocale;
}
saveLocale(deviceLanguage);

const loadLanguageFromStorage = async () => {
  try {  
    const value = await AsyncStorage.getItem('language');
    if (value !== null) {
       i18n.changeLanguage(value);
    }
  } catch (error) {
    console.log(error);
  }
}; 
loadLanguageFromStorage();
const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: deviceLanguage,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false
  }
});