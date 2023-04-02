import React, {useState} from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import TouchableText from './../components/TouchableText';
import Data from '../data/test1.json';

type ItemProps = {question: string, options: any};

const Item = ({question, options }: ItemProps) => (
    <View style={styles.item}>
        {/*<Text style={styles.title}>{question}</Text>*/}
        {Data.map((question, index) => (
            <View key={index}>
                <Text>{question.question}</Text>
                {question.options.map((option, index) => (
                    // <TouchableOpacity key={index} onPress={() => handleAnswer(option.points)}>
                    <TouchableOpacity key={index} onPress={() =>{} }>
                        <Text>{option.option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ))}
        <TouchableText/>
    </View>
);

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Data}
                renderItem={({item}) => <Item question={item.question} />}
            />
        </SafeAreaView>
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

// const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// const [score, setScore] = useState(0);
//
// const handleAnswer = (points) => {
//     setScore(score + points);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
// };

export default App;