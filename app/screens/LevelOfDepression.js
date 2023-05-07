import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/level-of-depression-20.json';
import { useTranslation } from 'react-i18next';
import {themeContext} from '../providers/ThemeContext';
import PreStartMessage from "../components/PreStartMessage";
import ProgressBar from '../components/ProgressBar';

const App = () => {
    const { t } = useTranslation()
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState(Array(Data.length).fill(''));
    const [pointsProgressBar, setPointsProgressBar] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [resultPoints, setResultPoints] = useState();
    const finalPoints = (points).reduce((acc, curr) => acc + curr, 0);
   

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
      

      
      const calculateFinalPoints = () => {
console.log(finalPoints);
 
        
         if (finalPoints === 80) {
             setResultPoints(t("ВариантА"));
         } else if (finalPoints === 20) {
             setResultPoints(t("ВариантБ"));
         } else {
             setResultPoints(t("BариантС"));
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
          <View style={[styles.modalView, {backgroundColor: theme.background}]}>
            <View style={styles.textWrapper}>
                <Text style={[styles.modalText, { color: theme.color }]}> {resultPoints}</Text>
            </View>
            <View style={[styles.button, styles.buttonClose]}>
                    <TouchableOpacity onPress={handelHomePage}>
                        <View style={styles.button}>
                            <Text style={styles.textStyle}>{t("GoHome")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
          </View>
        </View>
      </Modal>
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
        fontSize: 19,
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
        marginTop: '50%',
        borderRadius: 20,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        flex:1,
        width: '100%',
        padding: 35,
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
        marginBottom: 15,
        textAlign: "center",
        fontSize: 24,
        textAlignVertical: 'center',
        padding: 10,
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
      }
});

export default App;

// Большинство ответов "а": вы общительный и коммуникабельный человек, который любит работать с людьми и создавать новые связи. Вам могут подойти такие карьеры, как менеджер, продажник, социальный работник и другие профессии, связанные с общением.
// Большинство ответов "б": вы довольно универсальный человек, который может работать и в команде, и самостоятельно. Вам могут подойти разные профессии, которые требуют гибкости и адаптивности, такие как консультант, фрилансер или менеджер проектов.
// Большинство ответов "в": вы предпочитаете работать самостоятельно и избегать общения с людьми. Вам могут подойти такие профессии, как архитектор, програмист, писатель и другие, которые позволяют работать в одиночку и не зависеть от других людей.