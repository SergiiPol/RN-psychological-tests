import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/azenk-epq-101.json';
import { useTranslation } from 'react-i18next';
import themeContext from '../providers/ThemeContext';
import PreStartMessage from "../components/PreStartMessage";
import ProgressBar from '../components/ProgressBar';

const App = () => {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState([]);
    const [pointsProgressBar, setPointsProgressBar] = useState(0);

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
        if (currentIndex < Data.length-1) {
            setCurrentIndex(currentIndex + 1);
        }
        if (currentIndex < Data.length) {
            setPointsProgressBar(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setPointsProgressBar(currentIndex - 1);
        }
    };

    const currentQuestion = Data[currentIndex];
    const { t } = useTranslation()

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <ProgressBar value={pointsProgressBar} max={Data.length} />
            {pointsProgressBar !== currentIndex +1 && (
                <PreStartMessage  messageTime={t('azenk-pre-start-message-time')} messageText={t('azenk-pre-start-message')} 
                style={{ justifyContent: 'start', alignItems: 'start' , padding: 5}} />
            )}
            {/* <Text style={[styles.textQuestion, {color: theme.color}]}>{t("QuestionNumber")}{currentQuestion.id}
            </Text> */}
            {pointsProgressBar !== currentIndex +1 &&(
            <><Text style={[styles.textCurrentQuestion, { color: theme.color }]}>{t(currentQuestion.question)}
                </Text><View style={styles.wrapperButtonAnswer}>
                        {currentQuestion.options.map(option => (
                            <TouchableOpacity onPress={() => handleAnswer(option.points, currentQuestion.id)}
                                key={option.option}>
                                <View style={styles.buttonAnswer}>
                                    <Text style={styles.textButtonAnswer}>{t(option.option)}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View></>
            )}
            <View style={styles.buttonBack}>
                    {currentIndex !== 0 && pointsProgressBar !== currentIndex +1 &&(
                        <View>
                            <BackButton onPress={handlePrev} disabled={currentIndex === 0}/>
                        </View>
                    )}
            </View>
                {points.length === Data.length && (
                    <View style={styles.buttonResult}>
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
        // justifyContent: 'space-around',
        padding: 3,
    },
    wrapperButtonAnswer: {
        flex: 0.125,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 40,
    },
    buttonAnswer: {

    },
    textButtonAnswer: {
        fontSize: 32,
        color: '#d9f5c1',
    },
    buttonResult: {
        flex: 0.15,
        justifyContent: 'center',
        marginTop: '50%',
        },
    buttonBack: {
        flex: 0.05,
        backgroundColor: '#fffc' ,
        borderRadius: 50,
        marginTop:10,
    },
    textQuestion: {
        flex: 0.1,
        fontSize: 26,
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    textCurrentQuestion: {
        flex: 0.35,
        fontSize: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    }
});

export default App;