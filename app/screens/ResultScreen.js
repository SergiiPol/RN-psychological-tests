import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import themeContext from '../providers/themeContext';
import { useTranslation } from 'react-i18next';

const App = ({route}) => {
    const theme = useContext(themeContext);
    const {resultPoints} = route.params;
    const { t } = useTranslation();

    const psychoticismResult = () => {
        // более 10 - работа с людьми противопоказана
        // от 6 до 10 - есть склонность к эмоциональной неадекватности
        // от 0 до 5 - отсутствует
        if(resultPoints[0] > 10) {
            return 'работа с людьми противопоказана'
        } else if (resultPoints[0] <= 5) {
            return t('absent');
        } else if(resultPoints[0] > 6) {
            return 'есть склонность к эмоциональной неадекватности'
        }
    }

    const extraversionIntroversion = () => {
        // более 15 - «чистый» экстраверт
        // от 7 до 15 - амбивалентность, неопределённость
        // от 0 до 6 - «чистый» интроверт
        if(resultPoints[1] > 15) {
            return '\'чистый\' экстраверт';
        } else if (resultPoints[1] <= 6) {
            return '\'чистый\' интроверт';
        } else if(resultPoints[1] > 7) {
            return 'амбивалентность, неопределённость';
        }
    }

    const neuroticism = () => {
        // более 16 - ярко выраженный нейротизм
        // от 8 до 16 - средний балл
        // от 0 до 7 - эмоциональная устойчивость
        if(resultPoints[2] > 15) {
            return 'ярко выраженный нейротизм';
        } else if (resultPoints[2] <= 7) {
            return 'эмоциональная устойчивость';
        } else if(resultPoints[2] > 7) {
            return 'средний балл';
        }
    }

    const sincerity = () => {
        // более 10 - недостоверный результат
        if(resultPoints[3] > 10) {
            return 'недостоверный результат';
        } else if (resultPoints[3] <= 10) {
            return 'достоверный результат';
        }
    }

    return (
        <View style={[styles.container,{backgroundColor: theme.background, color: theme.color}]}>
            <Text style={[styles.item]}>{t('psychoticism')}: {psychoticismResult()}</Text>
            <Text style={[styles.item]}>{t('extraversionIntroversion')}: {extraversionIntroversion()}</Text>
            <Text style={[styles.item]}>{t('neuroticism')}: {neuroticism()}</Text>
            <Text style={[styles.item]}>{t('sincerity')}: {sincerity()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        fontSize: 20
    }
});


export default App;