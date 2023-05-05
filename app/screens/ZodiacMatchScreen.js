import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/zodiac-match-20.json';
import { useTranslation } from 'react-i18next';
import {themeContext} from '../providers/ThemeContext';
import PreStartMessage from "../components/PreStartMessage";
import ProgressBar from '../components/ProgressBar';

const App = () => {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState(Array(Data.length).fill(''));
    const [pointsProgressBar, setPointsProgressBar] = useState(0);
console.log(currentIndex, "currentIndex");

    const handleAnswer = (selectedPoints) => {
        setPoints(points.map((item, index) => {
          if (index === currentIndex) {
            return selectedPoints;
          }
          return item;
        }));
      
        handleNext();
        calculateFinalPoints();
      };
      

      const calculateFinalPoints = () => {
        let counts = {
            a: 0,
            b: 0,
            c: 0
        };
    
        for (let i = 0; i < points.length; i++) {
            switch (points[i]) {
                case 'a':
                    counts.a++;
                    break;
                case 'b':
                    counts.b++;
                    break;
                case 'c':
                    counts.c++;
                    break;
                default:
                    break;
            }
        }
    
        let maxCount = Math.max(counts.a, counts.b, counts.c);
 
        // console.log(maxCount);
        if (maxCount === counts.a) {
            console.log("a");
            return 'a';
        } else if (maxCount === counts.b) {
            console.log("b");
            return 'b';
        } else {
            console.log("c");
            return 'c';
        }
        
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
                <PreStartMessage style={{ justifyContent: 'start', alignItems: 'start' , padding: 5}} />
            )}
            {pointsProgressBar !== currentIndex +1 && (
            <><Text style={[styles.textCurrentQuestion, { color: theme.color }]}>{t(currentQuestion.question)}
                </Text><View style={styles.wrapperButtonAnswer}>
                        {currentQuestion.options.map(option => (
                            <TouchableOpacity onPress={() => handleAnswer(option.points)} key={option.option}>
                                <View style={[styles.buttonAnswer, { color: theme.color }]}>
                                    <Text style={[styles.textButtonAnswer, { color: theme.color }]}> - {t(option.option)}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View></>
            )}
            <View style={styles.buttonBackWrapper}>
                {currentIndex !== 0 && pointsProgressBar !== currentIndex +1 && (
                    <View style={styles.buttonBack}>
                        <BackButton onPress={handlePrev} disabled={currentIndex === 0}/>
                    </View>
                )}
            </View>
            {pointsProgressBar === Data.length && (
                <View style={styles.buttonResult}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.button}>
                            <Text style={styles.textButtonResult}>{t("Result")}</Text>
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
        flex: 0.65,
        alignItems: 'baseline',
        // alignContent: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'column',
        padding: 15,
        gap: 20,
    },
    textButtonAnswer: {
        fontSize: 22,
        color: '#4B1E19',
        marginTop:10,
    },
    textButtonResult: {
        color: '#d9f5c1',
        fontSize: 36,
        marginTop:10,
    },
    buttonResult: {
        flex: 0.15,
        justifyContent: 'center',
        marginTop: '50%',
    },
    buttonBackWrapper: {
        flex: 0.06,
        backgroundColor: '#fffc' ,
        borderRadius: 50,
        marginTop:10,     
    },
    buttonBack:{
    },
    textQuestion: {
        flex: 0.1,
        fontSize: 26,
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    textCurrentQuestion: {
        // flex: 0.1,
        fontSize: 28,
        textAlign: 'center',
        textAlignVertical: 'top',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    }
});

export default App;