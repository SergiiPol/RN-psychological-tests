import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../providers/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const SwitcherTheme = () => {
    const [mode, setMode] = useState(true);
    const theme = useContext(themeContext);

    useEffect(() => {
        AsyncStorage.getItem('mode')
          .then((value) => {
            if (value !== null) {
              const mode = JSON.parse(value);
              setMode(mode);
            }
          });
    }, []);
      
    const onModeChange = () => {
        const newMode = !mode;
        AsyncStorage.setItem('mode', JSON.stringify(newMode));
        EventRegister.emit("changeTheme", newMode);
        setMode(newMode);
    };
       

    return (
        <TouchableOpacity
            style={[styles.containerWrapper, {backgroundColor: theme.background}]}
            onPress={onModeChange}
        >
            <Text>Toggle theme</Text> 
            <Text style={[styles.buttonText, {backgroundColor: theme.background}]}>
                {mode ? <Feather name="sun" size={24} color="black" /> 
                      : <FontAwesome name="moon-o" size={24} color="black"/> }
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerWrapper: {
        flexDirection: "row",
        height: 50,
        width: 150,
        borderRadius: 5,
        marginLeft: 0,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default SwitcherTheme;
