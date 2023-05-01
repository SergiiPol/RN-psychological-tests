import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/geography-10.json';
import ResultScreen from "./ResultScreen";
import {useTranslation} from 'react-i18next';
import themeContext from '../providers/themeContext';
import ProgressBar from '../components/progressBar';

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
            <ProgressBar value={currentIndex} max={Data.length} />
            <Text style={[{
                fontSize: 28
            }, {color: theme.color}]}>{t("QuestionNumber")}{currentQuestion.id}</Text>
            <Text style={[{
                fontSize: 20
            }, {color: theme.color}]}>{t(currentQuestion.question)}</Text>
            {currentQuestion.options.map(option => (
                    <TouchableOpacity onPress={()=>  handleAnswer(option.points, currentQuestion.id)}
                                      key={option.option}>
                      <View style={styles.buttonAnswer}>
                          <Text style={styles.textButtonAnswer}>{t(option.option)}</Text>
                      </View>
                    </TouchableOpacity>
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
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.button}>
                           <Text style={styles.textButtonAnswer}>{t("Result")}</Text>
                        </View>
                    </TouchableOpacity>
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
    textButtonAnswer: {
        fontSize: 20,
        color: '#fffc',
        marginTop: 10,
    },
});

export default App;