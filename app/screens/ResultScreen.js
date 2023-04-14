import React from 'react';
import {Text, View} from 'react-native';

const App = ({route}) => {
    const {resultPoints} = route.params;

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>psychoticism: {resultPoints[0]}</Text>
            <Text>extraversionIntroversion: {resultPoints[1]}</Text>
            <Text>neuroticism: {resultPoints[2]}</Text>
            <Text>sincerity: {resultPoints[3]}</Text>
        </View>
    );
};

export default App;