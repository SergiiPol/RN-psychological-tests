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
            return t('работа с людьми противопоказана');
        } else if (resultPoints[0] <= 5) {
            return t('absent');
        } else if(resultPoints[0] > 6) {
            return t('есть склонность к эмоциональной неадекватности');
        }
    }

    const extraversionIntroversion = () => {
        // более 15 - «чистый» экстраверт
        // от 7 до 15 - амбивалентность, неопределённость
        // от 0 до 6 - «чистый» интроверт
        if(resultPoints[1] > 15) {
            return t('\'чистый\' экстраверт');
        } else if (resultPoints[1] <= 6) {
            return t('\'чистый\' интроверт');
        } else if(resultPoints[1] > 7) {
            return t('амбивалентность, неопределённость');
        }
    }

    const neuroticism = () => {
        // более 16 - ярко выраженный нейротизм
        // от 8 до 16 - средний балл
        // от 0 до 7 - эмоциональная устойчивость
        if(resultPoints[2] > 15) {
            return t('ярко выраженный нейротизм');
        } else if (resultPoints[2] <= 7) {
            return t('эмоциональная устойчивость');
        } else if(resultPoints[2] > 7) {
            return t('средний балл');
        }
    }

    const sincerity = () => {
        // более 10 - недостоверный результат
        if(resultPoints[3] > 10) {
            return t('недостоверный результат');
        } else if (resultPoints[3] <= 10) {
            return t('достоверный результат');
        }
    }

    return (
        <View style={[styles.container,{backgroundColor: theme.background}]}>
            <Text style={[styles.item, {color: theme.color}]}>{t('psychoticism')}:{"\n"}
                <Text style={[styles.itemChild]}>{psychoticismResult()}</Text>
            </Text>
            <Text style={[styles.item, {color: theme.color}]}>{t('extraversionIntroversion')}:{"\n"}
                <Text style={[styles.itemChild]}>{extraversionIntroversion()}</Text>
            </Text>
            <Text style={[styles.item, {color: theme.color}]}>{t('neuroticism')}:{"\n"}
                <Text style={[styles.itemChild]}>{neuroticism()}</Text>
            </Text>
            <Text style={[styles.item, {color: theme.color}]}>{t('sincerity')}:{"\n"}
                <Text style={[styles.itemChild]}>{sincerity()}</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    item: {
        flexDirection: 'row',
        fontSize: 20
    },
    itemChild: {
        flexDirection: 'row',
        fontSize: 14
    }
});


export default App;