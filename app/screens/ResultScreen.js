import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import themeContext from '../providers/ThemeContext';
import {useTranslation} from 'react-i18next';

const App = ({route}) => {
    const theme = useContext(themeContext);
    const {resultPoints} = route.params;
    const {t} = useTranslation();

    const psychoticismResult = () => {
        // более 10 - работа с людьми противопоказана
        // от 6 до 10 - есть склонность к эмоциональной неадекватности
        // от 0 до 5 - отсутствует
        if (resultPoints[0] > 10) {
            return t('Работа с людьми противопоказана');
        } else if (resultPoints[0] <= 5) {
            return t('absent');
        } else if (resultPoints[0] > 6) {
            return t('Есть склонность к эмоциональной неадекватности');
        }
    }

    const extraversionIntroversion = () => {
        // более 15 - «чистый» экстраверт
        // от 7 до 15 - амбивалентность, неопределённость
        // от 0 до 6 - «чистый» интроверт
        if (resultPoints[1] > 15) {
            return t('\'чистый\' экстраверт');
        } else if (resultPoints[1] <= 6) {
            return t('\'чистый\' интроверт');
        } else if (resultPoints[1] > 7) {
            return t('амбивалентность, неопределённость');
        }
    }

    const neuroticism = () => {
        // более 16 - ярко выраженный нейротизм
        // от 8 до 16 - средний балл
        // от 0 до 7 - эмоциональная устойчивость
        if (resultPoints[2] > 15) {
            return t('ярко выраженный нейротизм');
        } else if (resultPoints[2] <= 7) {
            return t('эмоциональная устойчивость');
        } else if (resultPoints[2] > 7) {
            return t('средний балл');
        }
    }

    const sincerity = () => {
        // более 10 - недостоверный результат
        if (resultPoints[3] > 10) {
            return t('недостоверный результат');
        } else if (resultPoints[3] <= 10) {
            return t('достоверный результат');
        }
    }

    const type = () => {
        if (resultPoints[1] > 15) {
            if (resultPoints[2] > 16) {
                return t('X');
            } else if (resultPoints[2] < 8) {
                return t('C');
            } else if (resultPoints[2] >= 8) {
                return t('XC');
            } else {
                return t('неопределено');
            }
        } else if (resultPoints[1] <= 6) {
            if (resultPoints[2] > 16) {
                return t('Mел');
            } else if (resultPoints[2] < 8) {
                return t('Ф');
            } else if (resultPoints[2] >= 8) {
                return t('ФМ');
            } else {
                return t('неопределено');
            }
        } else if (resultPoints[1] > 7) {
            if (resultPoints[2] > 16) {
                return t('МХ');
            } else if (resultPoints[2] < 8) {
                return t('СФ');
            } else if (resultPoints[2] >= 8) {
                return t('Н');
            } else {
                return t('неопределено');
            }
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={[styles.item, {color: theme.color}]}>{t('psychoticism')}:{"\n"}
                <Text style={[styles.itemChild]}>{psychoticismResult()}</Text>
            </Text>
            <Text style={[styles.item, {color: theme.color}]}>{t('extraversion')}:{"\n"}
                <Text style={[styles.itemChild]}>{extraversionIntroversion()}</Text>
            </Text>
            <Text style={[styles.item, {color: theme.color}]}>{t('neuroticism')}:{"\n"}
                <Text style={[styles.itemChild]}>{neuroticism()}</Text>
            </Text>
            <Text style={[styles.item, {color: theme.color}]}>{t('sincerity')}:{"\n"}
                <Text style={[styles.itemChild]}>{sincerity()}</Text>
            </Text>
            <Text style={[styles.item, {color: theme.color}]}>{t('type')}:{"\n"}
                <Text style={[styles.itemChild]}>{type()}</Text>
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