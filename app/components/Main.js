import  React, {useState, useEffect} from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, View, useColorScheme} from "react-native";
import PageScreen from '../screens/PageScreen';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
import { useTranslation } from 'react-i18next';
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../providers/themeContext";
import theme from "../constants/theme";

 const Stack = createNativeStackNavigator();

function App() {
    const [mode , setMode] = useState(false);
     
    useEffect(() =>{
        let eventListener = EventRegister.addEventListener("changeTheme", (data) =>{
            setMode(data);
        });
        return () =>{
            EventRegister.removeEventListener(eventListener);
        };
    });
        const { t } = useTranslation()
        return (
            <themeContext.Provider value={mode === false ? theme.light : theme.dark }>
                <NavigationContainer  theme={ mode === true ? DarkTheme : DefaultTheme}>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name='Home' 
                                        component={HomeScreen}         
                                        options={{
                                        title: 'My home',
                                        headerStyle: {
                                          backgroundColor: '#f4511e',
                                          justifyContent: 'start',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                          fontWeight: 'bold',
                                        },
                                      }} 
                                      />
                        <Stack.Screen name='EPQ-R' 
                                        component={PageScreen}
                                        options={{
                                            title: 'EPQ-R',
                                            headerStyle: {
                                              backgroundColor: '#f4511e',
                                              justifyContent: 'flex-end',
                                              
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                              fontWeight: 'bold',
                                            },
                                        }}
                                    />
                        <Stack.Screen name='ResultScreen' 
                                        component={ResultScreen}
                                        options={{
                                            title: 'ResultScreen',
                                            headerStyle: {
                                              backgroundColor: '#f4511e',
                                              justifyContent: 'start',
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                              fontWeight: 'bold',
                                            },
                                        }}
                                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </themeContext.Provider>
        );
    }

    
    export default App;
