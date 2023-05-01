import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

const ProgressBar = ({ value, max }) => {
  const progress = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(progress, {
      toValue: value / max,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [value, max, progress]);

  return (
    <View style={styles.wrapperProgressBar}>
        <View style={styles.container}>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressBarInner, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
          </View>
          <Text style={styles.progressText}>{Math.round((value / max) * 100)}%</Text>
        </View>
        <View style={styles.containerIndexQuestion}>
            <Text style={styles.textIndexQuestion}> {value} </Text>
            <Text style={styles.textIndexQuestion}>/</Text>
            <Text style={styles.textIndexQuestion}> {max} </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperProgressBar: {
    flex: 0.125,
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  progressBar: {
    height: 20,
    width: '80%',
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: '#75ba3a',

  },
  progressText: {
    marginLeft: 10,
    color: '#fff',
  },
  containerIndexQuestion: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textIndexQuestion: {
    fontSize: 24,
    color: "#fff"
  }
});

export default ProgressBar;
