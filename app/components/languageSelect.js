import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { Fontisto } from '@expo/vector-icons';
 //import DropDownPicker from '@react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageSelect = () => {

  const { t, i18n } = useTranslation();
  
  const [selectedValue, setSelectedValue] = useState(); 

  const handleValueChange = async (itemValue) => {
    setSelectedValue(itemValue);
    i18n.changeLanguage(itemValue);
    try {
      await AsyncStorage.setItem('language', itemValue);
      console.log(lang);
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
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'red' }} >
          
          <Picker
            selectedValue={selectedValue}
            style={{ height: 30, width: 25, marginTop: 0, marginRight: -17 }}
            onValueChange={handleValueChange}
          >
            <Picker.Item label="**select language**" value="" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Русский" value="ru" />
          </Picker>
          <Fontisto name="world" size={24} color="black" style={{  marginRight: 10, }} />
   </View>
  );
};

//  export function LanguageSelect() {
//   const {t, i18n} = useTranslation(); // destructure i18n here
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState('ru');
//   const [items, setItems] = useState([
//     {label: 'English', value: 'en'},
//     {label: 'Русский', value: 'ru'},
//     {label: 'Español', value: 'es'},
//   ]);
// console.log(value);
//   useEffect(() => {
//     i18n.changeLanguage(value);
//   }, [value]);

//   return (
//     <View>
//       <Text>{t('Language')}</Text>
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//       />
//     </View>
//   );
// }
