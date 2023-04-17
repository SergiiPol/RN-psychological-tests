import React from "react";
import './app/locale/i18n';
import { StatusBar } from 'expo-status-bar';
import  Main  from './app/components/Main';
import {
    I18nManager,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
  } from "react-native";


export default function App() {
    return (
        <Main />
    );
}

