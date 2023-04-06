import React from 'react';
import {Text, View} from 'react-native';

const App = ({route}) => {
    const {resultPoints} = route.params;

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Финальное значение: {resultPoints}</Text>
        </View>
    );
};

export default App;