import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/anxiety-scale-60.json';
import { useTranslation } from 'react-i18next';
import {themeContext} from '../providers/ThemeContext';
import PreStartMessage from "../components/PreStartMessage";
import ProgressBar from '../components/ProgressBar';
import PieChart from '../components/PieChart';
const App = () => {
    const { t } = useTranslation()
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState(Array(Data.length).fill(''));
    const [pointsProgressBar, setPointsProgressBar] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [resultPoints, setResultPoints] = useState();
    const finalPoints = calculateSumTrueAnswer(points);
    const finalFalsyPoints = calculateSumFalsyAnswer(points);
    const dataChart=[
        { x: t("True"), y: 100 - (finalFalsyPoints * 10) },
        { x: t("False"), y: finalFalsyPoints * 10 },
      ];
console.log(points);
console.log(calculateSumFalsyAnswer(points))
console.log(calculateSumTrueAnswer(points));
console.log(getFalsyResult(finalFalsyPoints));
    const handleAnswer = (selectedPoints) => {
        setPoints(points.map((item, index) => {
          if (index === currentIndex) {
            calculateFinalPoints();
            return selectedPoints;
          }
          return item;
        }));
        
        handleNext();
        calculateFinalPoints();
      };
     
      function calculateSumTrueAnswer(array) {
        const excludedIndices = [1, 9, 54, 15, 19, 26, 28, 40, 50, 58];
        let totalSum = 0;
        for (let i = 0; i < array.length; i++) {
          if (!excludedIndices.includes(i)) {
            totalSum += array[i];
          }
        }
        return totalSum;
      }
      function calculateSumFalsyAnswer(array) {
        const includedIndices = [1, 9, 54, 15, 19, 26, 28, 40, 50, 58];
        let totalSum = 0;
        for (let i = 0; i < array.length; i++) {
          if (includedIndices.includes(i)) {
            totalSum += array[i];
          }
        }
        return totalSum;
      }
      function getFalsyResult(sum) {      
        if (sum === 10) {
          return t('абсолютное отсутствие искренности ответов');
        } else if (sum === 9) {
          return t('очень низкий уровень искренности ответов');
        } else if (sum === 8) {
          return t('низкий уровень искренности ответов');
        } else if (sum === 7) {
          return t('низкий уровень искренности ответов');
        } else if (sum === 6) {
          return t('уровень искренности ниже среднего ответов');
        } else if (sum === 5) {
          return t('средний уровень искренности ответов');
        } else if (sum === 4) {
          return t('умеренный уровень искренности ответов');
        } else if (sum === 3) {
          return t('уровень искренности  ответов значительно выше среднего');
        } else if (sum === 2) {
          return t('высокий уровень искренности ответов');
        } else if (sum === 1) {
          return t('очень высокий уровень искренности ответов');
        } else if (sum === 0) {
          return t('очень высокий уровень искренности ответов');
        } else {
          return 'No matching result';
        }
      }
      calculateSumTrueAnswer(points);
      calculateSumFalsyAnswer(points);
      getFalsyResult(finalFalsyPoints);
      const calculateFinalPoints = () => {
        if (finalPoints <= 15) {
            setResultPoints(t("У Вас низкий уровнь чувства тревоги"));
          } else if (finalPoints >= 16 && finalPoints <= 25) {
            setResultPoints(t("У Вас средний уровень чувства тревоги"));
          }  else if (finalPoints >= 26 && finalPoints <= 39) {
            setResultPoints(t("У Вас высокоий уровень тревожного состояния"));
          } else if (finalPoints >= 40 && finalPoints <= 50) {
            setResultPoints(t("У Вас очень высокий уровень тревoжного состояния"));
          }
           else {
            setResultPoints(t("Попробуйте пройти тест ещё раз"));
          }
        
    };
    
    const handelHomePage = () => {
        setModalVisible(false)
        navigation.navigate('Home');
    }
    const handleSubmit = () => {
        calculateFinalPoints();
        setModalVisible(true);
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

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <ProgressBar value={pointsProgressBar} max={Data.length} />
            {pointsProgressBar !== currentIndex +1 && (
                <PreStartMessage messageTime={t('сообщение времени теста тревоги')} messageText={t('текст сообщения тревоги')}
                style={{ justifyContent: 'start', alignItems: 'start' , padding: 5}} />
            )}
            {pointsProgressBar !== currentIndex +1 && (
            <><Text style={[styles.textCurrentQuestion, { color: theme.color }]}>{t(currentQuestion.question)}
                </Text><View style={styles.wrapperButtonAnswer}>
                        {currentQuestion.options.map(option => (
                            <TouchableOpacity onPress={() => handleAnswer(option.points)} key={option.option}>
                                <View style={[styles.buttonAnswer, { color: theme.color }]}>
                                    <Text style={styles.textButtonAnswer}> {t(option.option)}</Text>
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
                        <View style={[styles.buttonResultTextWrapper,styles.button]}>
                            <Text style={styles.textButtonResult}>{t("Result")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
        <ScrollView style={styles.scrollView}>
            <View style={[styles.modalView, {backgroundColor: theme.background}]}>
                <View style={styles.textWrapper}>
                    <Text style={[styles.modalText, { color: theme.color }]}> {resultPoints}</Text>
                    <Text style={styles.descriptionAnxiety}>{t("Описание тревожного состояния")}</Text>
                    <Text style={[styles.textH3, { color: theme.color }]}>{t("Искренность ответов")}</Text>
                <View style={styles.wrapperChart}>
                    <Text style={[styles.textChart, { color: theme.color }]}> {getFalsyResult(finalFalsyPoints)} </Text>
                    <PieChart data={dataChart} width={180} height={180}/>
                </View>
                <Text style={styles.scaleSincerity}> {t("описание шкалы искренности")} </Text>
                </View>
                <View style={[styles.button, styles.buttonClose]}>
                        <TouchableOpacity onPress={handelHomePage}>
                            <View style={styles.button}>
                                <Text style={styles.textStyle}>{t("GoHome")}</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </View>
      </Modal>
    </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 3,
    },
    wrapperButtonAnswer: {
        flex: 0.125,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 60,
    },
    textButtonAnswer: {
      fontSize: 32,
      color: '#d9f5c1',
        marginTop:15,
    },
    buttonResultTextWrapper: {
        backgroundColor: '#BFBDC0',
        borderRadius: 15
    },
    textButtonResult: {
        color: '#fff',
        fontSize: 36,
        padding: 10,
        textAlignVertical: 'center',
    },
    buttonResult: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%',
        borderRadius: 20,
    },
    buttonBackWrapper: {
        flex: 0.06,
        backgroundColor: '#fffc' ,
        borderRadius: 50,
        marginTop:80,     
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
        flex: 0.45,
        fontSize: 28,
        textAlignVertical: 'center',
        textAlign: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      modalView: {
        flex:1,
        width: '100%',
        padding: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3
      },
      button: {
        borderRadius: 20,
        padding: 7,
        elevation: 10
      },
      buttonClose: {
        marginTop: 50,
        backgroundColor: "#BFBDC0",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 26,
        textAlignVertical: 'center',
        padding: 10,
        marginTop: 30,
        borderBottomWidth: 1,
        borderColor: '#fffc',
      },
      textWrapper: {
        backgroundColor: '#B29F91',
        borderRadius: 20,
        elevation: 15,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 3,
        borderRightWidth: 1,
        borderColor: '#fffc',
      },
      descriptionAnxiety: {
        padding: 10,
        fontSize: 16,
      },
      textH3: {
        fontSize: 20,
        textAlign: 'center',
        borderTopWidth: 1,
        borderColor: '#fffc',
        marginTop: 50,
      },
      wrapperChart: {
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        paddingRight: 20
      },
      textChart: {
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '50%', 
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#fffc',
      },
      scaleSincerity: {
        padding: 10,
        fontSize: 16,
      }
});

export default App;
