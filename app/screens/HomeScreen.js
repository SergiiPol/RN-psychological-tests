import React from 'react';
import {Button, Text, View} from 'react-native';

const App = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to the test"
                onPress={() => navigation.navigate('EPQ-R')}
            />
        </View>
    );
};

export default App;