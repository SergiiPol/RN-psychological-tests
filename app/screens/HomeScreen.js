import React, {useContext} from 'react';
import {Button, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import themeContext from '../providers/themeContext';

const App = ({navigation}) => {
    const theme = useContext(themeContext);
    const { t } = useTranslation(); 
    
    return (
        <View style={[styles.containerToolBar, { backgroundColor: theme.background }]}>
          <Text style={[styles.text, { color: theme.color }]}>{t('HomeScreen')}</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('EPQ-R')}>
            <View style={styles.button}>
             <Text style={styles.textButton}>{t('GoToTheTest')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('geography')}>
            <View style={styles.button}>
             <Text style={styles.textButton}>{t('geography')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Zodiac Match')}>
            <View style={styles.buttonZodiac}>
             <Text style={styles.textButtonZodiac}>{t('ZodiacMatch')}</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
  containerToolBar:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  text:{
    display: "flex",
    alignSelf: "center",
    fontSize: 30,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#CB8A58',
  },
  buttonZodiac:{
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#CB8A58',
  },
  textButton:{
    fontSize: 32,
    fontWeight: '700',
    color: '#F2F2EF',
  },
  textButtonZodiac:{
    fontSize: 24,
    fontWeight: '700',
    color: '#F2F2EF',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})

export default App;