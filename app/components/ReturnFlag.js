import React, {useState, useEffect} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage.clear();

export default function ReturnFlag() {
  const FlagRu = <Image source={require("./icons/ru_flag_24.png")} />;
  const FlagEs = <Image source={require("./icons/es_flag_24.png")} />;
  const FlagEn = <Image source={require("./icons/en_flag_24.png")} />;
  const [selectedLang, setSelectedLang] = useState();
  const [Flag, setFlag] = useState(FlagEn);

    const currentLang = async () => {
         let lang = '';
         try {
           lang = await AsyncStorage.getItem('language') || 'none';
           setSelectedLang(lang);
         } catch (error) {
           console.log(error.message);
         }
         return lang;
       }
       currentLang();

       useEffect(() => {
         if (selectedLang) {
             switch (selectedLang) {
                 case "ru":
                     setFlag(FlagRu);
                     break;
                 case "en":
                     setFlag(FlagEn);
                     break;
                 case "es":
                     setFlag(FlagEs);
                     break;
                 default:
                     setFlag(FlagEn);
                     break;
             }
         }
     }, [selectedLang]);
   
  return (
        <View style={styles.flag}>
          { Flag }
        </View>
  )
}

const styles = StyleSheet.create({
  flag: {
    
    },
});