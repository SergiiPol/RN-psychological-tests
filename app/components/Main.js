import React, {useEffect, useState} from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PageScreen from '../screens/PageScreen';
import HomeScreen from '../screens/HomeScreen';
import GeographyScreen from '../screens/GeographyScreen';
import ZodiacMatchScreen from '../screens/ZodiacMatchScreen';
import ResultScreen from '../screens/ResultScreen';
import {useTranslation} from 'react-i18next';
import {EventRegister} from "react-native-event-listeners";
import themeContext from "../providers/ThemeContext";
import theme from "../constants/theme";
import ToolBar from '../components/ToolBar';

const Stack = createNativeStackNavigator();

function App() {
    const [mode, setMode] = useState(false);

    useEffect(() => {
        let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
            setMode(data);
        });
        return () => {
            EventRegister.removeEventListener(eventListener);
        };
    });
    const {t} = useTranslation()
    return (
        <themeContext.Provider value={mode === false ? theme.light : theme.dark}>
            <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name='Home'
                                  component={HomeScreen}
                                  options={{
                                      headerRight: () => <ToolBar/>,
                                      title: 'InMyMind',
                                      // headerTitleAlign: 'center',
                                      headerStyle: {
                                          backgroundColor: '#D5AA72',
                                      },
                                      headerTintColor: '#562B1A',
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
                                          backgroundColor: '#D5AA72',
                                      },
                                      headerTintColor: '#562B1A',
                                      headerTitleStyle: {
                                          fontWeight: 'bold',
                                      },
                                  }}
                    />
                    <Stack.Screen name='geography'
                                  component={GeographyScreen}
                                  options={{
                                      title: 'geography',
                                      headerStyle: {
                                          backgroundColor: '#D5AA72',
                                          justifyContent: 'flex-end',

                                      },
                                      headerTintColor: '#0a0857',
                                      headerTitleStyle: {
                                          fontWeight: 'bold',
                                      },
                                  }}
                    />
                    <Stack.Screen name='Zodiac Match'
                                  component={ZodiacMatchScreen}
                                  options={{
                                      title: 'Zodiac Match',
                                      headerStyle: {
                                          backgroundColor: '#D5AA72',
                                          justifyContent: 'flex-end',

                                      },
                                      headerTintColor: '#0a0857',
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
                                          backgroundColor: '#D5AA72',
                                          justifyContent: 'start',
                                      },
                                      headerTintColor: '#0a0857',
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
