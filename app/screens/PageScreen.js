import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import BackButton from './../components/icons/BackButton';
// import Data from '../data/test1.json';
import Data from '../data/azenk-epq-101.json';
import ResultScreen from "./ResultScreen";

const App = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState([]);

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

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 3 }}>
            <Text>Вопрос номер #{currentQuestion.id}</Text>
            <Text style={{ flexDirection: 'row' , fontSize: 20}}>{currentQuestion.question}</Text>
            {currentQuestion.options.map(option => (
                <Button
                    key={option.option}
                    title={option.option}
                    onPress={() => handleAnswer(option.points)}
                />
            ))}
            <View style={{ flexDirection: 'row' , backgroundColor: '#ffe4c2'}}>
                <BackButton onPress={handlePrev} disabled={currentIndex === 0}/>
                {/*<Button title="previous question" onPress={handlePrev} disabled={currentIndex === 0} />*/}
                {/*<Button title="Вперед" onPress={handleNext} disabled={currentIndex === Data.length - 1} />*/}
            </View>

            {points.length === Data.length && (
                <View>
                    <Button
                        title="result"
                        onPress={handleSubmit}
                    />
                </View>

            )}
        </View>
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