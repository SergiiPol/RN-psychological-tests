import React, {useContext} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import themeContext from '../providers/themeContext';


const App = ({navigation}) => {
    const theme = useContext(themeContext);
    const { t } = useTranslation(); 
    
    return (
        <View style={[styles.containerToolBar, {backgroundColor: theme.background}]}>
            <Text style={[styles.text, {color: theme.color}]}>{t('HomeScreen')}</Text>
            <Button
                title={t('GoToTheTest')}
                onPress={() => navigation.navigate('EPQ-R')} />
        </View>
    );
};


const styles = StyleSheet.create({
  containerToolBar:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text:{
    display: "flex",
    alignSelf: "center",
    fontSize: 30,
  }
})

export default App;