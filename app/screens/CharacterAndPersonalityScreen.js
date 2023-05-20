import React, {useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import themeContext from '../providers/ThemeContext';

const App = ({navigation}) => {
    const theme = useContext(themeContext);
    const { t } = useTranslation(); 
    
    return (
        <View style={[styles.containerToolBar, { backgroundColor: theme.background }]}>
          <TouchableOpacity onPress={()=> navigation.navigate('EPQ-R')}>
            <View style={styles.button}>
             <Text style={styles.textButton}>{t('GoToTheTest')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Assessing the level of depression')}>
            <View style={styles.button}>
             <Text style={styles.textButton}>{t('Level of depression')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Level of mood')}>
            <View style={styles.button}>
             <Text style={styles.textButton}>{t('Your mood today')}</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  containerToolBar:{
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    gap: 15,
  },
  text:{
    alignSelf: "center",
    fontSize: 30,
  },
  button:{
    width: 250,
    borderRadius: 20,
    padding: 7,
    elevation: 15,
    marginTop: 10,
    backgroundColor: "#BFBDC0",
  },
  textButton:{
    fontSize: 24,
    fontWeight: '700',
    color: '#F2F2EF',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})

export default App;