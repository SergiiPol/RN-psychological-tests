import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { LanguageSelect } from './LanguageSelect';
import SwitcherTheme from './SwitcerTheme';
import themeContext from '../providers/themeContext';

const ToolBar = () => {
    const theme = useContext(themeContext);

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
           <SwitcherTheme style={styles.switcherTheme} />
           <LanguageSelect style={styles.languageSelect} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f4511e',
        flexDirection: "row",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        height: 55,
        width: "100%",
      },
      languageSelect:{
        flex: 1,
      },
      switcherTheme:{
        flex: 1,
      }
  })

export default ToolBar;