import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/azenk-epq-101.json';
// import Data from '../data/azenk-epq-101-RU';
import ResultScreen from "./ResultScreen";
import { useTranslation } from 'react-i18next';
import themeContext from '../providers/themeContext';

const App = () => {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState([]);
    // const [selectedLang, setSelectedLang] = useState();
    // const [Data, setData] = useState(Data);

    const psychoticismKeys = [2, 6, 9, 11, 19, 39, 43, 59, 63, 67, 78, 100, 14, 23, 27, 31, 35, 47, 51, 55, 71, 85, 88, 93, 97];
    const extraversionIntroversionKeys = [22, 30, 46, 84, 1, 5, 10, 15, 18, 26, 34, 38, 42, 50, 54, 58, 62, 66, 70, 74, 77, 81, 90, 92, 96];
    const neuroticismKeys = [3, 7, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 75, 79, 83, 86, 89, 94, 98];
    const sincerityKeys = [4, 8, 17, 25, 29, 41, 45, 49, 53, 57, 65, 69, 76, 80, 82, 91, 95, 13, 21, 33, 37, 61, 73, 87, 99];

    const [traits, setTraits] = useState({
        psychoticism: {},
        extraversionIntroversion: {},
        neuroticism: {},
        sincerity: {}
    });

    // const currentLang = async () => {
    //     let lang = '';
    //     try {
    //       lang = await AsyncStorage.getItem('language') || 'none';
    //       setSelectedLang(lang);
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //     return lang;
    //   }
    //   currentLang();

    
    // useEffect(() => {
    //     if (selectedLang) {
    //         switch (selectedLang) {
    //             case "ru":
    //                 setData(DataRu);
    //                 break;
    //             case "en":
    //                 setData(DataEn);
    //                 break;
    //             case "es":
    //                 setData(DataEs);
    //                 break;
    //             default:
    //                 setData(DataEn);
    //                 break;
    //         }
    //     }
    // }, [selectedLang]);

    const handleAnswer = (point, currentQuestionId) => {
        const updatedTraits = {...traits};

        if (psychoticismKeys.includes(currentQuestionId)) {
            updatedTraits.psychoticism[currentQuestionId] = point;
        } else if (extraversionIntroversionKeys.includes(currentQuestionId)) {
            updatedTraits.extraversionIntroversion[currentQuestionId] = point;
        } else if (neuroticismKeys.includes(currentQuestionId)) {
            updatedTraits.neuroticism[currentQuestionId] = point;
        } else if (sincerityKeys.includes(currentQuestionId)) {
            updatedTraits.sincerity[currentQuestionId] = point;
        }

        setTraits(updatedTraits);

        const updatedPoints = [...points];
        updatedPoints[currentIndex] = point;
        setPoints(updatedPoints);

        handleNext();
    };

    const calculateFinalPoints = () => {
        return [
            Object.values(traits.psychoticism).reduce((acc, curr) => acc + curr, 0),
            Object.values(traits.extraversionIntroversion).reduce((acc, curr) => acc + curr, 0),
            Object.values(traits.neuroticism).reduce((acc, curr) => acc + curr, 0),
            Object.values(traits.sincerity).reduce((acc, curr) => acc + curr, 0)
        ]
    };

    const handleSubmit = () => {
        navigation.navigate('ResultScreen',
            {resultPoints: calculateFinalPoints()}
        );
    };

    const handleNext = () => {
        if (currentIndex < Data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentQuestion = Data[currentIndex];
    const { t } = useTranslation()

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={[{
                fontSize: 28
            }, {color: theme.color}]}>{t("QuestionNumber")}{currentQuestion.id}</Text>
            <Text style={[{
                fontSize: 20
            }, {color: theme.color}]}>{t(currentQuestion.question)}</Text>
            {currentQuestion.options.map(option => (
                <Button
                    key={option.option}
                    title={t(option.option)}
                    onPress={() => handleAnswer(option.points, currentQuestion.id)}/>
            ))}
            <View style={{backgroundColor: '#fa836d' , borderRadius: 50}}>
                <BackButton onPress={handlePrev} disabled={currentIndex === 0}/>
                {/*<Button title="previous question" onPress={handlePrev} disabled={currentIndex === 0} />*/}
                {/*<Button title="Вперед" onPress={handleNext} disabled={currentIndex === Data.length - 1} />*/}
            </View>
            {points.length === Data.length && (
                <View>
                    <Button
                        title={t("Result")}
                        onPress={handleSubmit}/>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    item: {
    },
    back: {

    },
});

export default App;