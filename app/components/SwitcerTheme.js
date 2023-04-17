import React, { useState, useContext } from 'react';
import { Switch, View, StyleSheet, Image } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../providers/themeContext';

const SwitcherTheme = () => {
    const [mode, setMode] = useState(true);
    const theme = useContext(themeContext);

    return (
        <View style={[styles.containerWrapper, {backgroundColor: theme.background}]}>
            <View style={[styles.container, {backgroundColor: theme.background}]}>
                <Image
                    style={styles.stretch}
                    source={require("./icons/theme-light-dark.png")}
                />
            </View>
            <Switch
                style={[styles.switch, {backgroundColor: theme.background}]}
                value={mode}
                onValueChange={() => {
                    setMode((value) => !value);
                    EventRegister.emit("changeTheme", mode);
                } } />
        </View>
    );
};
const styles = StyleSheet.create({
    containerWrapper: {
        backgroundColor: '#f4511e',
        flexDirection: "row",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        height: 55,
        width: 75,
        borderRightWidth: 1,
        borderRightColor: "grey",
        borderRadius: 5,
    },
    container: {
      flex: 1,
      width: 30,
      height: 30,
      alignSelf: "center",
      backgroundColor: '#f4511e',
    },
    stretch: {
      width: 30,
      height: 30,
    },
    switch: {
        flex: 1, 
        height: 55, 
        width: 30, 
        backgroundColor: '#f4511e'
    }
  });

export default SwitcherTheme;