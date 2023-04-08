import React from 'react';
import {Button, Text, View} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../components/languageSelect';

const App = ({navigation}) => {
    const { t } = useTranslation()
    return (
        <>
        <LanguageSelect  style={{  marginTop: 10, }} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'skyblue' }}>
            <Text>{t('HomeScreen')}</Text>
            <Button
                title={t('GoToTheTest')}
                onPress={() => navigation.navigate('EPQ-R')} />
          </View>
        </>
    );
};

export default App;