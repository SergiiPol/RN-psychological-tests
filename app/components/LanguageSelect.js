import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../providers/ThemeContext';

 const LanguageSelect = () => {

  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(); 

  const handleValueChange = async (itemValue) => {
    setSelectedValue(itemValue);
    i18n.changeLanguage(itemValue);
    try {
      await AsyncStorage.setItem('language', itemValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLanguageFromStorage = async () => {
    try {  
      const value = await AsyncStorage.getItem('language');
      if (value !== null) {
        setSelectedValue(value);
        i18n.changeLanguage(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLanguageFromStorage();
  }, []);
  
  return (
    <View >
          <Picker
            selectedValue={selectedValue}
            style={[styles.containerLanguage, {color: theme.color, backgroundColor: theme.background}]}
            onValueChange={handleValueChange}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Русский" value="ru" />
          </Picker>
   </View>
  );
};
const styles = StyleSheet.create({
  containerLanguage: {
      height: 30,
      width: 155, 
      marginTop: 0, 
      backgroundColor: '#f4511e',
      borderLeftWidth: 1,
      borderRadius: 5,
  },
});

export default LanguageSelect;