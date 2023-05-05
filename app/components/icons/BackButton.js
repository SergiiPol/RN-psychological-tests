import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Icon name="arrow-back" size={32} color="#000" />
    </TouchableOpacity>
);

export default BackButton;
