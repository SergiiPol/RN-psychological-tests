import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/cattell-105.json';
import { useTranslation } from 'react-i18next';
import {themeContext} from '../providers/ThemeContext';
import PreStartMessage from "../components/PreStartMessage";
import ProgressBar from '../components/ProgressBar';
import BarChart from '../components/BarChart';
import PieLabelRadiusChart from '../components/PieLabelRadiusChart';
import { VictoryTheme } from 'victory-native';

const App = () => {
    const { t } = useTranslation()
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState(Array(Data.length).fill(''));
    const [pointsProgressBar, setPointsProgressBar] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const pointsMD = calculateAnswer(points, [0, 17, 34, 51, 68, 85, 102]);
    const pointsA = calculateAnswer(points, [1, 18, 35, 52, 69, 86]);
    const pointsB = calculateAnswer(points, [2, 19, 36, 53, 70, 87, 103, 104]);
    const pointsC = calculateAnswer(points, [3, 20, 37, 54, 71, 88]);
    const pointsE = calculateAnswer(points, [4, 21, 38, 55, 72, 89]);
    const pointsF = calculateAnswer(points, [5, 22, 39, 56, 73, 90]);
    const pointsG = calculateAnswer(points, [6, 23, 40, 57, 74, 91]);
    const pointsH = calculateAnswer(points, [7, 24, 41, 58, 75, 92]);
    const pointsI = calculateAnswer(points, [8, 25, 42, 59, 76, 93]);
    const pointsJ = calculateAnswer(points, [9, 26, 43, 60, 77, 94]);
    const pointsM = calculateAnswer(points, [10, 27, 44, 61, 78, 95]);
    const pointsN = calculateAnswer(points, [11, 28, 45, 62, 79, 96]);
    const pointsO = calculateAnswer(points, [12, 29, 46, 63, 80, 97]);
    const pointsQ1 = calculateAnswer(points, [13, 30, 47, 64, 81, 98]);
    const pointsQ2 = calculateAnswer(points, [14, 31, 48, 65, 82, 99]);
    const pointsQ3 = calculateAnswer(points, [15, 32, 49, 66, 83, 100]);
    const pointsQ4 = calculateAnswer(points, [16, 33, 50, 67, 84, 101]);
    const chartData = [
        { quarter: "MD", earnings: pointsMD },
        { quarter: "A", earnings: pointsA },
        { quarter: "B", earnings: pointsB },
        { quarter: "C", earnings: pointsC },
        { quarter: "E", earnings: pointsE },
        { quarter: "F", earnings: pointsF },
        { quarter: "G", earnings: pointsG },
        { quarter: "H", earnings: pointsH },
        { quarter: "I", earnings: pointsI },
        { quarter: "J", earnings: pointsJ },
        { quarter: "M", earnings: pointsM },
        { quarter: "N", earnings: pointsN },
        { quarter: "O", earnings: pointsO },
        { quarter: "Q1", earnings: pointsQ1 },
        { quarter: "Q2", earnings: pointsQ2 },
        { quarter: "Q3", earnings: pointsQ3 },
        { quarter: "Q4", earnings: pointsQ4 },
      ];
    const chartDataPie=[
        { x: "MD", y : pointsMD },
        { x: "A", y : pointsA },
        { x: "B", y : pointsB },
        { x: "C", y : pointsC },
        { x: "E", y : pointsE },
        { x: "F", y : pointsF },
        { x: "G", y : pointsG },
        { x: "H", y : pointsH },
        { x: "I", y : pointsI },
        { x: "J", y : pointsJ },
        { x: "M", y : pointsM },
        { x: "N", y : pointsN },
        { x: "O", y : pointsO },
        { x: "Q1", y: pointsQ1 },
        { x: "Q2", y: pointsQ2 },
        { x: "Q3", y: pointsQ3 },
        { x: "Q4", y: pointsQ4 }
      ];
      const renderCategory = (category, index) => (
        <View key={index} style={styles.resulttWrapper}>
          <Text style={[styles.modalText, { color: theme.color }]}>
            <Text style={styles.nameCategory}> {t("Фактор")} "{category.x}" {"\n"} </Text>
            <Text style={styles.descriptionCategory}> {t(category.x +'description')}  {"\n"} </Text>
            {t("Ваш показатель ")}{category.y}{t(" из ")} 12
          </Text>
          <Text style={styles.textCategory}>{t(category.x)} </Text>
        </View>
      );
      
      const renderedCategories = chartDataPie.map((category, index) => renderCategory(category, index));
      
      
    // console.log(pointsMD, "MD");
    // console.log(pointsA, "A");
    // console.log(pointsB, "B");
    // console.log(pointsC, "C");
    // console.log(pointsE, "E");
    // console.log(pointsF, "F");
    // console.log(pointsG, "G");
    // console.log(pointsH, "H");
    // console.log(pointsI, "I");
    // console.log(pointsJ, "J");
    // console.log(pointsM, "M");
    // console.log(pointsN, "N");
    // console.log(pointsO, "O");
    // console.log(pointsQ1, "Q1");
    // console.log(pointsQ2, "Q2");
    // console.log(pointsQ3, "Q3");
    // console.log(pointsQ4, "Q4");

    function calculateAnswer(array, includedIndices) {
        let totalSum = 0;
        for (let i = 0; i < array.length; i++) {
          if (includedIndices.includes(i)) {
            totalSum += array[i];
          }
        }
        return totalSum;
      }
      ;

    const handleAnswer = (selectedPoints) => {
        setPoints(points.map((item, index) => {
          if (index === currentIndex) {
            return selectedPoints;
          }
          return item;
        }));
        
        handleNext();
      };
    
    const handelHomePage = () => {
        setModalVisible(false)
        navigation.navigate('Home');
    }
    const handleSubmit = () => {
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
          <View>
            
          </View>
            <ProgressBar value={pointsProgressBar} max={Data.length} />
            {pointsProgressBar !== currentIndex +1 && (
                <PreStartMessage messageTime={t('сообщение времени теста Кэттела')} messageText={t('текст сообщения Кэттела')}
                style={{justifyContent: 'start', alignItems: 'start' , padding: 5}} />
            )}
            {pointsProgressBar !== currentIndex +1 && (
              <>
                <Text style={[styles.textCurrentQuestion, { color: theme.color }]}>{t(currentQuestion.question)}</Text>
                <View style={styles.wrapperButtonAnswer}>
                        {currentQuestion.options.map(option => (
                            <TouchableOpacity onPress={() => handleAnswer(option.points)} key={option.option}>
                                <View style={[styles.buttonAnswer, { color: theme.color }]}>
                                    <Text style={[styles.textButtonAnswer, { color: theme.color }]}> - {t(option.option)}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>
              </>
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
                <View style={styles.chartWrapper}>
                    <BarChart data={chartData} width={400} height={480} theme={VictoryTheme.material}/>
                    <PieLabelRadiusChart data={chartDataPie}/>
                </View>
                {renderedCategories}
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
        justifyContent: 'space-around',
        padding: 3,
    },
    wrapperButtonAnswer: {
        marginLeft: 0,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: 12,
        gap: 10,
    },
    textButtonAnswer: {
        fontSize: 20,
        minWidth: 150,
        minHeight: 40,
        color: '#4B1E19',
        marginTop:10,
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
        marginBottom: '50%',
        borderRadius: 20,
    },
    buttonBackWrapper: {
        backgroundColor: '#fffc' ,
        borderRadius: 50,
        marginTop:10, 
        alignSelf: 'center',
    },
    buttonBack:{
      justifyContent: 'center',
      alignItems: 'center',
      width: 40, 
      height: 40, 
    },
    textCurrentQuestion: {
      flex: 0.6,
        fontSize: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#fff', 
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        flex:1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2
        // },
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
        marginTop: 20,
        textAlign: "center",
        fontSize: 20,
        textAlignVertical: 'center',
        paddingTop: 10,
      },
      textWrapper: {
        backgroundColor: '#B29F91',
        borderRadius: 20,
        elevation: 15,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 3,
        borderRightWidth: 1,
        borderColor: '#fffc'
      },
      chartWrapper: {
        width: 400,
      },
      textCategory: {
        fontSize: 18,
        padding: 10,
        textAlign: 'left',
        marginTop:0,
      },
      nameCategory: {
        fontSize: 24,
      },
      descriptionCategory: {
        fontSize: 16,
        color: '#000',
      }
});

export default App;
