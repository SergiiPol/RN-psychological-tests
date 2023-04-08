import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, View} from "react-native";
import PageScreen from '../screens/PageScreen';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../components/languageSelect';



 const Stack = createNativeStackNavigator();


function App() {
        const { t } = useTranslation()
        return (
            <View style={styles.container} >
                <NavigationContainer >
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name={t('Home')} component={HomeScreen} />
                        <Stack.Screen name='EPQ-R' component={PageScreen} />
                        <Stack.Screen name={t('ResultScreen')} component={ResultScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: 'skyblue', 
        }
    });
    
    export default App;
