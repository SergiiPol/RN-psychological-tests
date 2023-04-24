import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, View} from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/geography-10.json';
import ResultScreen from "./ResultScreen";
import {useTranslation} from 'react-i18next';
import themeContext from '../providers/themeContext';

const App = () => {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState([]);

    const handleAnswer = (point, currentQuestionId) => {
        const updatedPoints = [...points];
        updatedPoints[currentIndex] = point;
        setPoints(updatedPoints);

        handleNext();
    };

    const calculateFinalPoints = () => {
        console.log('result ' + points.reduce((acc, curr) => acc + curr, 0));
        return points.reduce((acc, curr) => acc + curr, 0)
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
    const {t} = useTranslation()

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
            <View style={{backgroundColor: '#fa836d', borderRadius: 50}}>
                {currentIndex !== 0 && (
                    <View>
                        <BackButton onPress={handlePrev} disabled={currentIndex === 0}/>
                    </View>
                )}
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
    item: {},
    back: {},
});

export default App;