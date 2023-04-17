import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import themeContext from '../providers/themeContext';

const App = ({route}) => {
    const theme = useContext(themeContext);
    const {resultPoints} = route.params;

    return (
        <View style={[styles.container,{backgroundColor: theme.background}]}>
            <Text style={[{ flexDirection: 'row', fontSize: 20 }, {color: theme.color}]}>psychoticism: {resultPoints[0]}</Text>
            <Text style={[{ flexDirection: 'row', fontSize: 20 }, {color: theme.color}]}>extraversionIntroversion: {resultPoints[1]}</Text>
            <Text style={[{ flexDirection: 'row', fontSize: 20 }, {color: theme.color}]}>neuroticism: {resultPoints[2]}</Text>
            <Text style={[{ flexDirection: 'row', fontSize: 20 }, {color: theme.color}]}>sincerity: {resultPoints[3]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default App;