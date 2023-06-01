import React, {useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import themeContext from '../providers/ThemeContext';

const App = ({navigation}) => {
    const theme = useContext(themeContext);
    const { t } = useTranslation(); 
    return (
        <>
          <Text style={[styles.text, { color: theme.color, backgroundColor: theme.background }]}>{t('HomeScreen')}</Text> 
          <View style={[styles.containerToolBar, { backgroundColor: theme.background }]}>    
              <TouchableOpacity onPress={() => navigation.navigate('Character and personality')}>
                <View style={styles.button}>
                  <Text style={styles.textButton}>{t('Character and personality')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Entertainment tests')}>
                <View style={styles.button}>
                  <Text style={styles.textButton}>{t('Entertainment tests')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Intellectual tests')}>
                <View style={styles.button}>
                  <Text style={styles.textButton}>{t('Intellectual tests')}</Text>
                </View>
              </TouchableOpacity>
          </View>
        </>
    );
};


const styles = StyleSheet.create({
  containerToolBar:{
    flex: 1,
    alignItems: "center",
    gap: 15,
    justifyContent: 'center',
  },
  text:{
    width: '100%',
    textAlign: "center",
    textAlignVertical:'center',
    fontSize: 36,
  },
  button:{
    width: 280,
    borderRadius: 20,
    padding: 7,
    marginTop: 10,
    backgroundColor: "#FDBF6E",
    margin: 10,
    shadowColor: '#000',
    //shadowOffset: { width: 0, height: 5 },
    //shadowOpacity: 0.5,
    //shadowRadius: 2,
    elevation: 12,
    
  },
  textButton:{
    fontSize: 24,
    fontWeight: '700',
    color: '#F2F2EF',
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: "#E88846",
    borderRadius: 20,
  }
})

export default App;