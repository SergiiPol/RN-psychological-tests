import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import BackButton from './../components/icons/BackButton';
// import Data from '../data/test1.json';
import DataRu from '../data/azenk-epq-101-RU';
import DataEn from '../data/azenk-epq-101-EN';
import DataEs from '../data/azenk-epq-101-ES';
import ResultScreen from "./ResultScreen";
import { LanguageSelect } from '../components/languageSelect';
import { useTranslation } from 'react-i18next';

const App = () => {
    
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState([]);
    const [selectedLang, setSelectedLang] = useState();
    const [Data, setData] = useState(DataEn);

    const psychoticismKeys = [2, 6, 9, 11, 19, 39, 43, 59, 63, 67, 78, 100, 14, 23, 27, 31, 35, 47, 51, 55, 71, 85, 88, 93, 97];
    const extraversionIntroversionKeys = [22, 30, 46, 84, 1, 5, 10, 15, 18, 26, 34, 38, 42, 50, 54, 58, 62, 66, 70, 74, 77, 81, 90, 92, 96];
    const neuroticismKeys = [3, 7, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 75, 79, 83, 86, 89, 94, 98];
    const sincerityKeys = [4, 8, 17, 25, 29, 41, 45, 49, 53, 57, 65, 69, 76, 80, 82, 91, 95, 13, 21, 33, 37, 61, 73, 87, 99];

    const [psychoticism, setPsychoticism] = useState([0]);
    const [extraversionIntroversion, setExtraversionIntroversion] = useState([0]);
    const [neuroticism, setNeuroticism] = useState([0]);
    const [sincerity, setSincerity] = useState([0]);

    const currentLang = async () => {
        let lang = '';
        try {
          lang = await AsyncStorage.getItem('language') || 'none';
          setSelectedLang(lang);
        } catch (error) {
          console.log(error.message);
        }
        return lang;
      }
      currentLang();

    
    useEffect(() => {
        if (selectedLang) {
            switch (selectedLang) {
                case "ru":
                    setData(DataRu);
                    break;
                case "en":
                    setData(DataEn);
                    break;
                case "es":
                    setData(DataEs);
                    break;
                default:
                    setData(DataEn);
                    break;
            }
        }
    }, [selectedLang]); 

    const handleAnswer = (point, currentQuestionId ) => {
        if (psychoticismKeys.includes(currentQuestionId)) {
            const newPoints1 = [...psychoticism];
            newPoints1[currentQuestionId] = point;
            setPsychoticism(newPoints1);
        } else if (extraversionIntroversionKeys.includes(currentQuestionId)) {
            console.log(point, currentQuestionId);
            const newPoints2 = [...extraversionIntroversion];
            newPoints2[currentQuestionId] = point;
            setExtraversionIntroversion(newPoints2);
        } else if (neuroticismKeys.includes(currentQuestionId)) {
            const newPoints3 = [...neuroticism];
            newPoints3[currentQuestionId] = point;
            setNeuroticism(newPoints3);
        } else if (sincerityKeys.includes(currentQuestionId)) {
            const newPoints4 = [...sincerity];
            newPoints4[currentQuestionId] = point;
            setSincerity(newPoints4);
        }

        const newPoints = [...points];
        newPoints[currentIndex] = point;
        setPoints(newPoints);

        handleNext();
    };

    const calculateFinalPoints = () => {
        console.log('extraversionIntroversionKeys  ' + extraversionIntroversion);
        console.log('res=   ' + extraversionIntroversion.reduce((acc, curr) => acc + curr, 0));

        return [
            psychoticism.reduce((acc, curr) => acc + curr, 0),
            extraversionIntroversion.reduce((acc, curr) => acc + curr, 0),
            neuroticism.reduce((acc, curr) => acc + curr, 0),
            sincerity.reduce((acc, curr) => acc + curr, 0)
        ]
    };

    const handleSubmit = () => {
        navigation.navigate('ResultScreen',
            { resultPoints: calculateFinalPoints() }
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
        <>
            <LanguageSelect onPress={currentLang} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                <Text>{t("QuestionNumber")}{currentQuestion.id}</Text>
                <Text style={{ flexDirection: 'row', fontSize: 20 }}>{currentQuestion.question}</Text>
                {currentQuestion.options.map(option => (
                    <Button
                        key={option.option}
                        title={option.option}
                        onPress={() => handleAnswer(option.points, currentQuestion.id)} />
                ))}
                <View style={{ flexDirection: 'row', backgroundColor: '#ffe4c2' }}>
                    <BackButton onPress={handlePrev} disabled={currentIndex === 0} />
                    {/*<Button title="previous question" onPress={handlePrev} disabled={currentIndex === 0} />*/}
                    {/*<Button title="Вперед" onPress={handleNext} disabled={currentIndex === Data.length - 1} />*/}
                </View>
                {points.length === Data.length && (
                    <View>
                        <Button
                            title={t("Result")}
                            onPress={handleSubmit} />
                    </View>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    question: {
        fontSize: 32,
    },
});

export default App;