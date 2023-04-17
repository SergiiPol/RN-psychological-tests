import React, {useState, useContext} from 'react';
import {Button, Text, View, Switch, StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../components/LanguageSelect';
import { useTheme } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../providers/themeContext';
import SwitcherTheme from '../components/SwitcerTheme';
import ToolBar from '../components/ToolBar';

const App = ({navigation}) => {
    const theme = useContext(themeContext);
    const { t } = useTranslation(); 
    App.navigationOptions = {
      headerRight: () => <ToolBar />,
    };
    
    return (
        <>
        <ToolBar />
        <View style={[styles.containerToolBar, {backgroundColor: theme.background}]}>
            <Text style={[styles.text, {color: theme.color}]}>{t('HomeScreen')}</Text>
            <Button
                title={t('GoToTheTest')}
                onPress={() => navigation.navigate('EPQ-R')} />
        </View>
        </>
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