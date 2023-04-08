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

    const handleAnswer = (pointsToAdd) => {
        const newPoints = [...points];
        newPoints[currentIndex] = pointsToAdd;
        setPoints(newPoints);
        handleNext();
    };

    const calculateFinalPoints = () => {
        return points.reduce((acc, curr) => acc + curr, 0);
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
                        onPress={() => handleAnswer(option.points)} />
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