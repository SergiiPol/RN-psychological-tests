import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PageScreen from './../screens/PageScreen2';

class App extends Component {
    state = {
        count: 0,
    };

    onPress = () => {
        this.setState({
            count: this.state.count + 1,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.onPress}>
                    <View style={styles.button}>
                        <Text>Touch Here</Text>
                    </View>
                </TouchableHighlight>
                <View style={[styles.countContainer]}>
                    <Text style={[styles.countText]}>
                        {this.state.count ? this.state.count : null}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
    countText: {
        color: '#FF00FF',
    },
});

export default App;