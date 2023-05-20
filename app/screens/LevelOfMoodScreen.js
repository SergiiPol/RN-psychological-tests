import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import BackButton from './../components/icons/BackButton';
import Data from '../data/mood-20.json';
import { useTranslation } from 'react-i18next';
import {themeContext} from '../providers/ThemeContext';
import PreStartMessage from "../components/PreStartMessage";
import ProgressBar from '../components/ProgressBar';
import BarChart from '../components/BarChart';

const App = () => {
    const { t } = useTranslation()
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState(Array(Data.length).fill(''));
    const [pointsProgressBar, setPointsProgressBar] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [moodPoints] = useState([]);
    const [asthenicCondition] = useState([]);
    const [euphoriaState] = useState([]);
    const [moodFinalPoints, setMoodFinalPoints]= useState(0);
    const [asthenicFinalPoints, setAsthenicFinalPoints]= useState(0);
    const [euphoriaFinalPoints, setEuphoriaFinalPoints]= useState(0);
    const totalPoint = [moodFinalPoints, asthenicFinalPoints,euphoriaFinalPoints];

    const chartData = [
      { quarter: "A", earnings: moodFinalPoints },
      { quarter: "B", earnings: asthenicFinalPoints },
      { quarter: "С", earnings: euphoriaFinalPoints },
    ];

function calculatePoints(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      return false;
    }
  }
  for (let i = 0; i < arr.length; i++){
    if(arr[i] === "Нет"){
      moodPoints.push(arr[i]);
    }
    if (["Да"].includes(arr[i]) && [1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 14, 17, 18, 19].includes(i)) {
      asthenicCondition.push(arr[i]);
    }
    if (["Наоборот"].includes(arr[i]) && [0, 5, 7, 11, 15, 16].includes(i)) {
      asthenicCondition.push(arr[i]);
    }
    if (["Да"].includes(arr[i]) && [ 0, 5, 7, 11, 15, 16].includes(i)) {
      euphoriaState.push(arr[i]);
    }
    if (["Наоборот"].includes(arr[i]) && [ 1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 14, 17, 18, 19].includes(i)) {
      euphoriaState.push(arr[i]);
    }
  }
  return moodPoints.length === 0 && asthenicCondition.length > 0;
}

function calculateMoodScore(arrayLength) {
  if (arrayLength === 20) {
    return 9;
  } else if (arrayLength === 19) {
    return 8;
  } else if (arrayLength === 18) {
    return 7;
  } else if (arrayLength >= 16 && arrayLength <= 17) {
    return 6;
  } else if (arrayLength >= 13 && arrayLength <= 15) {
    return 5;
  } else if (arrayLength >= 10 && arrayLength <= 12) {
    return 4;
  } else if (arrayLength >= 8 && arrayLength <= 9) {
    return 3;
  } else if (arrayLength >= 6 && arrayLength <= 7) {
    return 2;
  } else if (arrayLength === 5) {
    return 1;
  } else {
    return 0;
  }
}
function calculateAsthenicScore(length) {
   if (length <= 2) {
    return 0;
  } else if (length === 3) {
    return 2;
  } else if (length === 4) {
    return 3;
  } else if (length <= 6) {
    return 4;
  } else if (length <= 8) {
    return 5;
  } else if (length <= 10) {
    return 6;
  } else if (length <= 13) {
    return 7;
  } else if (length <= 15) {
    return 8;
  } else {
    return 0;
  }
}
function calculateEuphoriaScore(length) {
   if (length <= 2) {
    return 0;
  } else if (length === 6) {
    return 1;
  } else if (length === 7) {
    return 2;
  } else if (length <= 9) {
    return 3;
  } else if (length <= 11) {
    return 4;
  } else if (length <= 13) {
    return 5;
  } else if (length <= 15) {
    return 6;
  } else if (length <= 17) {
    return 7;
  } else if (length <= 19) {
    return 8;
  } else if (length === 20) {
    return 9;
  }
}

function indexMax(arr) {
  let i, maxV, maxP;
  for( i = 0; i < arr.length; i++) {
    if( typeof maxV === "undefined" || arr[i] > maxV ) {
      maxV = arr[i];
      maxP = i;
    }
  }
  switch (maxP) {
    case 0:
      return t("У Вас преобладает 'Обычное настроение'");
    case 1:
      return t("У Вас преобладает 'Астеническое состояние'");
    case 2:
      return t("У Вас преобладает 'Состояние эйфории'");
    default:
      return t("... пройдите тест ещё раз");
  }
}

calculatePoints(points);

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
        setMoodFinalPoints(calculateMoodScore(moodPoints.length)),
        setAsthenicFinalPoints(calculateAsthenicScore(asthenicCondition.length)),
        setEuphoriaFinalPoints(calculateEuphoriaScore(euphoriaState.length))
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
                <PreStartMessage messageTime={t('сообщение времени теста настроения')} messageText={t('текст сообщения настроения')}
                style={{ justifyContent: 'start', alignItems: 'start' , padding: 5}} />
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
        <ScrollView style={styles.scrollView}>
          <View style={[styles.modalView, {backgroundColor: theme.background}]}>
            <View style={styles.textWrapper}>
            <BarChart data={chartData} />
                <Text style={[styles.modalText, { color: theme.color }]}>A - {t("Обычное настроение")}</Text>
                <Text style={[styles.modalText, { color: theme.color }]}>B - {t("Астеническое")}</Text>
                <Text style={[styles.modalText, { color: theme.color }]}>C - {t("Эйфории")}{"\n"}</Text>
                <Text style={styles.modalTextFinalResalt}> {indexMax(totalPoint)}. {"\n"}</Text>
            
                <View>
                    <View><Text style={styles.textStateMood}>  {t("Настроение")}{"\n"}</Text></View>
                    <View><Text style={styles.textStateMood}>  {t("Астеническое состояние")}{"\n"}</Text></View>
                    <View><Text style={styles.textStateMood}>  {t("Состояние эйфории")}{"\n"}</Text></View>
                </View>
            </View>
            <View style={[styles.buttonGoHome, styles.buttonClose]}>
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
        flex: 0.55,
        justifyContent: 'space-around',
        flexDirection: 'column',
        padding: 55,
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
        marginBottom: 20,     
    },
    textStateMood:{
      textAlignVertical: 'center',
      fontSize: 20,
      padding: 10,
    },
    textQuestion: {
        flex: 0.1,
        fontSize: 26,
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    textCurrentQuestion: {
        flex: 0.5,
        fontSize: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginTop: 20
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
        alignSelf: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3
      },
      button: {
        borderRadius: 20,
        padding: 7,
        elevation: 10,
      },
      buttonGoHome: {
        borderRadius: 20,
        padding: 7,
        elevation: 10,
        marginBottom: 50,
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
        textAlign: 'left',
        fontSize: 24,
        textAlignVertical: 'center',
        padding: 5,
        marginLeft: 20,
      },
      modalTextFinalResalt: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fffc',
        textAlignVertical: 'center',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
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
